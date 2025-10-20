import { ChatMessage, FAQItem } from '@/types/elevator';
import { ELEVATOR_MODELS, FAQS, COMPANY_INFO, QUICK_REPLIES, ACCESSORIES } from '@/constants/elevatorData';

export class ChatbotService {
  private static getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  static generateWelcomeMessage(): ChatMessage {
    return {
      id: Date.now().toString(),
      type: 'bot',
      content: `${this.getGreeting()}! Welcome to GPlus Elevator 🏢\n\nI'm your virtual assistant with access to our complete product documentation. I can help you with:\n\n• Product models & specifications\n• Accurate pricing information\n• Installation requirements\n• Safety features\n• Customization options\n\nHow can I assist you today?`,
      timestamp: new Date(),
      quickReplies: QUICK_REPLIES.initial,
    };
  }

  static processUserMessage(message: string): ChatMessage {
    const lowerMessage = message.toLowerCase().trim();
    let response = '';
    let quickReplies: string[] | undefined;

    // Product inquiries
    if (this.containsKeywords(lowerMessage, ['product', 'model', 'elevator', 'lift', 'view'])) {
      response = this.getProductOverview();
      quickReplies = QUICK_REPLIES.products;
    }
    // G+1 Models
    else if (this.containsKeywords(lowerMessage, ['g+1', 'g1', 'two floor', '2 floor', '2 landing'])) {
      response = this.getG1Models();
      quickReplies = ['Calculate Price', 'View G+2 Models', 'Back to Menu'];
    }
    // G+2 Models (CFM - Customer Favorite Model)
    else if (this.containsKeywords(lowerMessage, ['g+2', 'g2', 'three floor', '3 floor', '3 landing', 'cfm', 'best seller', 'favorite'])) {
      response = this.getG2Models();
      quickReplies = ['Calculate Price', 'View G+1 Models', 'Back to Menu'];
    }
    // G+3 Models
    else if (this.containsKeywords(lowerMessage, ['g+3', 'g3', 'four floor', '4 floor', '4 landing'])) {
      response = this.getG3Models();
      quickReplies = ['Calculate Price', 'Request Quote', 'Back to Menu'];
    }
    // Pricing
    else if (this.containsKeywords(lowerMessage, ['price', 'cost', 'budget', 'calculate', 'how much', 'payment'])) {
      response = this.getPricingInfo();
      quickReplies = ['View Products', 'Calculate Price', 'Back to Menu'];
    }
    // Installation
    else if (this.containsKeywords(lowerMessage, ['install', 'installation', 'setup', 'civil work', 'space', 'requirement'])) {
      response = this.getInstallationInfo();
      quickReplies = ['View Products', 'Request Quote', 'Back to Menu'];
    }
    // Technical specifications
    else if (this.containsKeywords(lowerMessage, ['motor', 'gearbox', 'controller', 'drive', 'speed', 'technical', 'specification'])) {
      response = this.getTechnicalSpecs();
      quickReplies = ['View Products', 'Safety Features', 'Back to Menu'];
    }
    // Maintenance
    else if (this.containsKeywords(lowerMessage, ['maintenance', 'amc', 'service', 'warranty'])) {
      response = this.getMaintenanceInfo();
      quickReplies = ['View AMC Packages', 'Request Quote', 'Back to Menu'];
    }
    // Safety
    else if (this.containsKeywords(lowerMessage, ['safe', 'safety', 'security', 'emergency', 'ard', 'rescue'])) {
      response = this.getSafetyInfo();
      quickReplies = ['View Products', 'Technical Specs', 'Back to Menu'];
    }
    // Cabin types
    else if (this.containsKeywords(lowerMessage, ['cabin', 'ms', 'ss', 'gold', 'stainless', 'material'])) {
      response = this.getCabinInfo();
      quickReplies = ['View Accessories', 'Request Quote', 'Back to Menu'];
    }
    // Doors
    else if (this.containsKeywords(lowerMessage, ['door', 'manual', 'auto', 'sliding', 'swing'])) {
      response = this.getDoorInfo();
      quickReplies = ['View Products', 'Calculate Price', 'Back to Menu'];
    }
    // Enclosures
    else if (this.containsKeywords(lowerMessage, ['enclosure', 'glass', 'acp', 'structure'])) {
      response = this.getEnclosureInfo();
      quickReplies = ['View Products', 'Calculate Price', 'Back to Menu'];
    }
    // Customization & Accessories
    else if (this.containsKeywords(lowerMessage, ['custom', 'accessory', 'add-on', 'upgrade', 'optional'])) {
      response = this.getCustomizationInfo();
      quickReplies = ['View Accessories', 'Request Quote', 'Back to Menu'];
    }
    // FAQs
    else if (this.containsKeywords(lowerMessage, ['faq', 'question', 'help', 'info'])) {
      response = this.getFAQOverview();
      quickReplies = ['Installation FAQs', 'Pricing FAQs', 'Safety FAQs', 'Back to Menu'];
    }
    // Contact
    else if (this.containsKeywords(lowerMessage, ['contact', 'phone', 'email', 'call', 'reach', 'website'])) {
      response = this.getContactInfo();
      quickReplies = ['Request Quote', 'View Products', 'Back to Menu'];
    }
    // Quote request
    else if (this.containsKeywords(lowerMessage, ['quote', 'quotation', 'estimate', 'proposal'])) {
      response = this.getQuoteInfo();
      quickReplies = ['Calculate Price', 'Contact Us', 'Back to Menu'];
    }
    // Compare models
    else if (this.containsKeywords(lowerMessage, ['compare', 'difference', 'classic vs ultra', 'classic or ultra'])) {
      response = this.getModelComparison();
      quickReplies = ['View Products', 'Calculate Price', 'Back to Menu'];
    }
    // Back to menu
    else if (this.containsKeywords(lowerMessage, ['back', 'menu', 'main', 'start'])) {
      response = 'What would you like to know about GPlus Elevators?';
      quickReplies = QUICK_REPLIES.initial;
    }
    // Default response
    else {
      response = this.getDefaultResponse(lowerMessage);
      quickReplies = QUICK_REPLIES.initial;
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      quickReplies,
    };
  }

  private static containsKeywords(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  private static getProductOverview(): string {
    return `🏢 **GPlus Elevator Models**

We offer three main series based on your building height:

**G+1 Series** (2 Landings)
• Classic: ₹5,00,000 - ₹5,80,000
• Ultra: ₹5,70,000 - ₹6,50,000

**G+2 Series** (3 Landings) ⭐ CFM - CUSTOMER'S FAVORITE MODEL
• Classic: ₹5,70,000 - ₹6,80,000
• Ultra: ₹7,20,000+
• Our best-selling model!
• 3rd landing can be closed floor or open terrace

**G+3 Series** (4 Landings)
• Perfect for two-story homes with terrace
• Custom pricing available

**All models available in:**
• Sizes: 3x3, 3.6x3.6, 4x4 feet
• Door Types: Manual Sliding or Auto Door
• Enclosures: ACP or Glass (1-2 sides)
• Cabin Types: Classic (MS) or Ultra (SS304)

Which model interests you?`;
  }

  private static getG1Models(): string {
    const g1Models = ELEVATOR_MODELS.filter(m => m.type === 'G+1');
    return `**G+1 Models** (2 Landings)

Perfect for ground + 1 floor buildings:

**Classic Series** (MS Cabin):
${g1Models.filter(m => m.category === 'Classic').map(m => 
  `• ${m.doorType} Door + ${m.enclosure}: ₹${(m.basePrice / 100000).toFixed(2)}L\n  ${m.features.slice(0, 3).join(', ')}`
).join('\n\n')}

**Ultra Series** (SS304 Cabin):
${g1Models.filter(m => m.category === 'Ultra').map(m => 
  `• ${m.doorType} Door + ${m.enclosure}: ₹${(m.basePrice / 100000).toFixed(2)}L\n  Premium stainless steel finish`
).join('\n\n')}

**Available Sizes:** 3x3, 3.6x3.6, 4x4 feet

All prices include GST + Erection Cost`;
  }

  private static getG2Models(): string {
    return `**G+2 Models** ⭐ CFM - CUSTOMER'S FAVORITE MODEL (3 Landings)

Our best-selling elevator! Why customers love it:
• 3 landings provide maximum versatility
• 3rd landing works for closed floor OR open terrace
• Can be installed anywhere
• 3x3 ft option is our premium compact choice

**Classic Series** (MS Cabin):
• Manual Door + ACP: ₹5,70,000
• Manual Door + Glass (1 Side): ₹6,40,000
• Manual Door + Glass (2 Sides): ₹6,70,000

**Ultra Series** (SS304 Cabin):
• Manual Door + Glass (1 Side): ₹7,20,000
• Premium rust-resistant stainless steel

**Why G+2 is Popular:**
✓ Most versatile for Indian homes
✓ Perfect size-to-value ratio
✓ Suitable for ground + 2 floors
✓ Terrace or closed floor flexibility

**Available Sizes:** 3x3, 3.6x3.6, 4x4 feet

All prices include GST + Erection Cost`;
  }

  private static getG3Models(): string {
    return `**G+3 Models** (4 Landings)

Ideal for:
• Two-story homes with terrace access
• Apartment-style individual houses
• Ground + 3 floor buildings

**Available in:**
• Classic Series (MS Cabin)
• Ultra Series (SS304 Cabin)

**Sizes:**
• 3x3 feet (Premium compact)
• 3.6x3.6 feet (Spacious)
• 4x4 feet (Maximum comfort)
• Customized sizes available

**Pricing:**
Custom quotes based on:
• Cabin type (Classic MS or Ultra SS)
• Door type (Manual/Auto)
• Enclosure type (ACP/Glass)
• Additional accessories

**Note:** Installation time may be longer for G+3 models.

Would you like a personalized quote?`;
  }

  private static getPricingInfo(): string {
    return `💰 **GPlus Elevator Pricing**

**Base Prices by Model:**

**G+1 Series:**
• Classic: ₹5.00L - ₹5.80L
• Ultra: ₹5.70L - ₹6.50L

**G+2 Series:** ⭐ CFM
• Classic: ₹5.70L - ₹6.80L
• Ultra: ₹7.20L+

**Price Factors:**
• Cabin Type (MS/SS304/Gold)
• Door Type (Manual/Auto)
• Enclosure (ACP/Glass)
• Size (3x3, 3.6x3.6, 4x4)
• Accessories & customization

**Payment Plan:**
• 10% - Advance payment
• 40% - At booking for fabrication
• 45% - Material arrival at site
• 5% - 80% completion

**What's Included:**
✓ All materials with GST
✓ Professional installation
✓ 1-year warranty (electrical/electronics)
✓ 5-year warranty (mechanical items)
✓ Quality certification

**Not Included:**
✗ Civil work (core cutting, plastering, tiling)
✗ 3-phase electrical supply setup
✗ Terrace closed structure (if needed)

Use our calculator for exact pricing!`;
  }

  private static getInstallationInfo(): string {
    return `🔧 **Installation Requirements**

**Space Requirements:**
• Minimum: 3x3 feet (standard)
• Options: 3.6x3.6 or 4x4 feet
• No extensive civil work needed
• Core cutting for existing homes

**Pre-Installation (Customer's Responsibility):**
1. Core cutting of roof
2. 3-Phase supply with 40/63 Amps MCCB
3. Bulkhead lighting with earthing
4. Completed plastering work
5. Completed tile work
6. For terrace: 12ft closed structure with roofing

**Timeline:**

**Standard Models:**
• Fabrication: 10-15 working days
• Installation: 5-10 working days

**Customized Models:**
• Fabrication: 20-25 working days
• Installation: 10-15 working days

**Installation Features:**
✓ Machine-room-less (MRL) design
✓ Minimal pit depth (180mm or pit-less)
✓ Professional setup team
✓ Quality assurance testing
✓ User training included

**No License Required** for residential installations!

**Important:** Working days exclude Sundays and holidays. Weather conditions may affect timeline.`;
  }

  private static getTechnicalSpecs(): string {
    return `⚙️ **Technical Specifications**

**Motor System:**
• Type: Geared Traction Motor (NOT hydraulic)
• Brand: Crompton
• Power: IE2 - 2.2 KW (3 HP) or 3.7 KW (5 HP)
• Speed: 1440 rpm
• Mounting: Flange Mounted S1 duty
• Brake: 190 Volts DC Brake Motor

**Gearbox:**
• Brand: ALM (Altra Premium)
• Model: ALM 110 or ALM 130
• Ratio: 40:1
• Frame Size: FR-100L
• Shaft Type: Hollow Shaft
• Protection: IP55
• Lubrication: Oil-filled

**Controller & Drive:**
We use 2 systems:
1. INVT VFD (Variable Frequency Drive)
2. Arkel Arcube/Arboxx (Integrated monoblock)

**Features:**
• VVVF control for smooth operation
• Self-fault diagnosis
• Microprocessor-based AC V3F
• Automatic phase changer
• Battery monitoring support

**Performance:**
• Capacity: 3-5 passengers (220 kg)
• Speed: 0.5-0.8 meters per second
• Travel: Up to 10M per floor
• Leveling Accuracy: 3mm
• Operation: Simplex Selective Collective

**Safety System:**
• No Over-Speed Governor (OSG) by default
• 2:1 roping system for safety
• Limit switches for over-travel protection
• ARD (Automatic Rescue Device) included

**Main Components:**
• Ropes: Usha Martin
• Cables: Fiber Core (Fire & Waterproof)
• Guide Rails: 70mm x 65mm x 9mm
• Anchors/Bolts: TVS brand`;
  }

  private static getMaintenanceInfo(): string {
    return `🛠️ **Maintenance Services**

**Two AMC Options:**

**1. Basic AMC** (₹8,000-17,000/year)
• Quarterly inspections (4/year)
• Preventive maintenance
• Cleaning & lubrication
• Basic adjustments
• Oil level monitoring
• Fault diagnosis
• **Parts NOT included**

**2. Comprehensive AMC** (₹30,000-55,000/year)
• Everything in Basic AMC
• **All parts replacement included**
• Electrical/electronic parts covered
• Emergency repairs (24-72 hrs)
• 24/7 support availability
• No hidden costs
• Power surge damage covered

**What's Covered:**
✓ Motor inspection
✓ Gearbox checks
✓ Control system testing
✓ Cable & rope examination
✓ Safety system verification
✓ Door mechanism servicing
✓ Complete cleaning

**Service Frequency:**
• Quarterly visits (4 per year)
• Emergency response: 6-8 hours

**Response Times:**
• Standard hours (Mon-Sat 9AM-6PM): Within 6 hours
• Off-peak hours: Within 8 hours

**Warranty:**
• 1 year: Electrical & Electronics
• 5 years: Mechanical items
• Additional 1 year extended warranty

**Not Covered:**
✗ Misuse or abuse damage
✗ Natural disaster damage
✗ Unauthorized modifications
✗ Cosmetic damage
✗ Third-party damage

Protect your investment with regular maintenance!`;
  }

  private static getSafetyInfo(): string {
    return `🛡️ **Safety Features**

**Emergency Systems:**
• **ARD (Automatic Rescue Device)**
  - Battery backup (8 hours)
  - Automatic evacuation during power failure
  - 2-5 second emergency response time

• **Emergency Alarm System**
  - Emergency bell/siren
  - Two-way communication (where applicable)

**Door Safety:**
• Double safety locks at all landing doors
• Manual emergency door release
• Key-based emergency access

**For Auto Doors:**
• Light curtain sensors (full-width)
• Automatic obstruction detection
• Auto-reverse on obstruction
• Door closure sensors

**Operational Safety:**
• Limit switches for over-travel protection
• 2:1 roping system
• Buffer springs (with 1ft pit)
• Automatic braking system
• Emergency stop button

**Control Features:**
• Automatic fan/light cut-off
• Floor announcing system
• 7-segment display
• VVVF drive for smooth operation
• Self-fault diagnosis

**Built-in Protection:**
• Automatic phase changer (Arkel controller)
• Inbuilt MCB (Arboxx unit)
• Overload sensors
• Fire & waterproof cables

**What We DON'T Have:**
✗ Over-Speed Governor (not required for home elevators)
✗ Car rope monitoring system
✗ Self-lubrication system

**Standards Compliance:**
✓ Exceeds residential safety standards
✓ Regular safety inspections included
✓ Professional installation team
✓ Quality certified components

Your safety is our priority!`;
  }

  private static getCabinInfo(): string {
    return `🏗️ **Cabin Types & Materials**

**Classic Series:**
• **Material:** MS (Mild Steel)
• **Finish:** Powder-coated
• **Durability:** High strength, cost-effective
• **Appearance:** Multiple color options
• **COP/LOP:** Acrylic panels
• **Auto Door:** MS material

**Ultra Series:**
• **Material:** SS304 (Stainless Steel)
• **Finish:** Polished stainless steel
• **Durability:** Rust-resistant, low maintenance
• **Appearance:** Sleek, modern, reflective
• **COP/LOP:** SS304 panels
• **Auto Door:** SS material

**Gold Plated Option:**
• Luxury finish available
• Gold-colored coating
• Premium appearance
• Custom pricing

**Cabin Features:**
• **Type:** Closed cabin (4 sides)
• **Front:** Manual/Auto door
• **Sides:** MS/SS panels
• **Ceiling:** MS/SS designed false ceiling
• **Flooring:** Matt or Vinyl stickers
• **Lighting:** LED lights included
• **Ventilation:** Blower fan included
• **Handrails:** One side (default), three sides optional

**Panel Colors Available:**
Multiple colors for MS cabins - contact us for color chart

**Size Options:**
• 3x3 feet
• 3.6x3.6 feet
• 4x4 feet
• Customized sizes available

Which cabin type matches your needs?`;
  }

  private static getDoorInfo(): string {
    return `🚪 **Door Options**

**Manual Sliding Door:**
• **Material:** Mesh sliding or MS/SS
• **Operation:** Manual push/pull
• **Cost:** Lower investment
• **Maintenance:** Minimal
• **Reliability:** Very high
• **Available in:** All models

**Auto Door:**
• **Material:** MS (Classic) or SS (Ultra)
• **Vision:** Half or Full glass vision
• **Operation:** Automatic with sensors
• **Safety:** Light curtain sensors
• **Features:** 
  - Auto-open/close buttons
  - Obstruction detection
  - Auto-reverse function
• **Cost:** Higher investment
• **Available in:** All models

**Swing Door Accessories:**
• MS Swing (Half Vision): ₹15,000
• MS Swing (Full Vision): ₹20,000
• SS Swing (Half Vision): ₹25,000
• SS Swing (Full Vision): ₹30,000

**Door Mechanisms:**
• Manual: User-operated handle/latch
• Auto: Sensor-based actuator system

**Safety Features:**
• Double safety locks (all doors)
• Emergency manual release
• Key-based emergency access
• Light curtain (auto doors only)

**Door Type:**
• Open type (manual)
• Concealed type option (auto)

**Material Quality:**
• Durable hinges (MS/SS)
• Smooth operation guaranteed
• Weather-resistant
• Fire & waterproof design

Which door type suits your needs?`;
  }

  private static getEnclosureInfo(): string {
    return `🏛️ **Enclosure Options**

**ACP Enclosure:**
• **Material:** Aluminum Composite Panel
• **Features:**
  - Weather resistant
  - Corrosion resistant
  - UV ray protection
  - Lightweight & durable
  - Easy maintenance
• **Colors:** Multiple options available
• **Finish:** Metallic, matte, gloss, textured
• **Cost:** Most economical
• **Suitable for:** Indoor & outdoor

**Glass Enclosure:**

**8mm Toughened Glass:**
• **Features:**
  - Sleek modern look
  - Enhanced light transmission
  - Clear visibility
  - Safety grade
• **Cost:** ₹200 per sqft additional

**12mm Toughened Glass:**
• **Features:**
  - Maximum strength
  - Temperature resistant
  - Superior safety
  - Premium appearance
• **Cost:** Higher investment

**Multi-Color Glass:**
• Eye-catching designs
• Extensive customization
• Unique color schemes
• Brightens/softens ambiance
• Modern aesthetic

**Glass Configuration:**
• **1 Side Glass:** One side transparent
• **2 Sides Glass:** Two sides transparent
• **Full Glass:** Complete glass enclosure (optional)

**Structure:**
• Steel frame construction
• Weather-proof design
• Professional installation
• Customizable to fit space

**Additional Costs:**
• Outdoor installations may cost extra
• Full structure without wall support: additional cost

Which enclosure style do you prefer?`;
  }

  private static getCustomizationInfo(): string {
    return `🎨 **Customization & Accessories**

**Security Accessories:**

**RF & Password:**
• LOP connection: ₹10,000
• COP connection: ₹15,000
• Radio frequency + password access

**Fingerprint & Password:**
• LOP connection: ₹15,000
• COP connection: ₹20,000
• Biometric security

**Touch Screen:**
• Touch Screen LOP: ₹3,000
• Touch Screen COP: ₹20,000
• Touch Screen with Glass LOP: ₹5,000
• Touch Screen with Glass COP: ₹30,000

**Technical Upgrades:**

**Phase Converter:**
• Single to 3-phase: ₹20,000
• Ensures consistent power supply

**Arkel Smart Controller:**
• IoT & Cloud Monitoring: ₹80,000
• Remote monitoring
• Data analytics
• Predictive maintenance
• Real-time updates

**Door Upgrades:**
(See door options for MS/SS swing doors)

**Glass Upgrade:**
• 12mm Toughened Glass: ₹200 per sqft

**Cabin Customization:**
• Multiple colors (MS cabins)
• SS304 upgrade (Ultra)
• Gold plating option
• Custom flooring designs
• LED lighting options
• Handrail configurations

**COP/LOP Styles:**
• Acrylic (Standard)
• SS304 (Premium)
• Gold/Rose Gold finish
• Touch screen options
• Custom designs available

**Size Customization:**
• Standard: 3x3, 3.6x3.6, 4x4 feet
• Custom sizes available on request

Build your perfect elevator!`;
  }

  private static getModelComparison(): string {
    return `⚖️ **Classic vs Ultra Comparison**

**Classic Series:**
✓ MS (Mild Steel) cabin
✓ Powder-coated finish
✓ Acrylic COP/LOP panels
✓ MS auto door (if selected)
✓ Cost-effective
✓ Durable & reliable
✓ Multiple color options
✓ Perfect for budget-conscious

**Price Range:** ₹5.00L - ₹6.80L

**Ultra Series:**
✓ SS304 stainless steel cabin
✓ Polished finish
✓ SS304 COP/LOP panels
✓ SS auto door (if selected)
✓ Premium appearance
✓ Rust-resistant
✓ Low maintenance
✓ Modern sleek design

**Price Range:** ₹5.70L - ₹7.20L+

**Key Differences:**

| Feature | Classic | Ultra |
|---------|---------|-------|
| Cabin | MS | SS304 |
| COP/LOP | Acrylic | SS304 |
| Auto Door | MS | SS304 |
| Finish | Powder coat | Polished |
| Corrosion | Resistant | Highly resistant |
| Maintenance | Regular | Minimal |
| Appearance | Classic | Premium |

**Both Include:**
• Same motor & gearbox
• Same controller technology
• Same safety features (ARD, alarms, etc.)
• Same warranty period
• Same installation process
• Same reliability

**Choose Classic if:**
• Budget is primary concern
• Indoor installation
• Color customization needed
• Standard home elevator

**Choose Ultra if:**
• Premium appearance desired
• High humidity environment
• Minimal maintenance preferred
• Modern aesthetic important

Both series deliver excellent quality and safety!`;
  }

  private static getFAQOverview(): string {
    const faqsByCategory: { [key: string]: FAQItem[] } = {};
    FAQS.forEach(faq => {
      if (!faqsByCategory[faq.category]) {
        faqsByCategory[faq.category] = [];
      }
      faqsByCategory[faq.category].push(faq);
    });

    let response = `❓ **Frequently Asked Questions**\n\n`;
    
    Object.keys(faqsByCategory).slice(0, 3).forEach(category => {
      response += `**${category}:**\n`;
      faqsByCategory[category].slice(0, 2).forEach(faq => {
        response += `\nQ: ${faq.question}\nA: ${faq.answer}\n`;
      });
      response += '\n';
    });

    response += `\n**More Questions?**\nAsk me anything about:\n• Installation requirements\n• Pricing & payment\n• Safety features\n• Technical specifications\n• Maintenance services\n\nWhat would you like to know?`;

    return response;
  }

  private static getContactInfo(): string {
    return `📞 **Contact GPlus Elevator**

**Get in Touch:**

📱 **Phone:**
${COMPANY_INFO.phone.join('\n')}

📧 **Email:**
${COMPANY_INFO.email}

🌐 **Website:**
${COMPANY_INFO.website}

**For Detailed Information:**
• Product Catalog: details.gpluselevator.com
• Company Website: gpluselevator.com

**Office Hours:**
Monday - Saturday: 9:00 AM - 6:00 PM

**Quick Actions:**
• Request detailed quotation
• Schedule site visit
• Technical consultation
• AMC enrollment

**Response Time:**
• Phone: Immediate
• Email: Within 24 hours

**Service Coverage:**
Available for installations across India

How would you like to proceed?`;
  }

  private static getQuoteInfo(): string {
    return `📋 **Request a Quote**

To provide you with an accurate quotation, please provide:

**Project Details:**
1. Building type (Residential/Commercial)
2. Number of floors (G+1/G+2/G+3)
3. Preferred size (3x3, 3.6x3.6, 4x4)
4. Model preference (Classic/Ultra)
5. Door type (Manual/Auto)
6. Enclosure type (ACP/Glass)

**Installation Site:**
7. Indoor or outdoor location
8. New construction or existing building
9. Available space details
10. Terrace access (if applicable)

**Contact Information:**
11. Your name
12. Phone number
13. Email address
14. Location/Address

**Additional Requirements:**
• Special customizations needed?
• Preferred accessories?
• Timeline requirements?

**Next Steps:**
1. Use our Price Calculator tab
2. Contact us directly: ${COMPANY_INFO.phone[0]}
3. Email: ${COMPANY_INFO.email}
4. Get detailed quotation within 24 hrs

**What's Included in Quote:**
✓ Base model pricing
✓ Installation costs
✓ GST breakdown
✓ Payment schedule
✓ Timeline estimate
✓ Warranty details

Ready to calculate your price or contact us?`;
  }

  private static getDefaultResponse(message: string): string {
    // Try to find related FAQ
    const relatedFAQ = FAQS.find(faq => 
      faq.question.toLowerCase().includes(message) || 
      faq.answer.toLowerCase().includes(message) ||
      message.split(' ').some(word => 
        word.length > 3 && faq.question.toLowerCase().includes(word)
      )
    );

    if (relatedFAQ) {
      return `**${relatedFAQ.question}**\n\n${relatedFAQ.answer}\n\nAnything else you would like to know?`;
    }

    return `I can help you with information about GPlus Elevators based on our documentation:

**Product Information:**
• G+1, G+2, G+3 models
• Classic vs Ultra series
• Pricing & specifications

**Installation & Technical:**
• Space requirements
• Installation process
• Technical specifications
• Motor & gearbox details

**Safety & Maintenance:**
• Safety features (ARD, alarms)
• AMC packages
• Warranty information

**Customization:**
• Cabin types (MS/SS/Gold)
• Door options (Manual/Auto)
• Enclosures (ACP/Glass)
• Accessories & upgrades

**Contact & Support:**
• Quotation requests
• Phone: ${COMPANY_INFO.phone[0]}
• Website: ${COMPANY_INFO.website}

What specific information are you looking for?`;
  }
}