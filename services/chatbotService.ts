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
      content: `${this.getGreeting()}! Welcome to GPlus Elevator 🏢\n\nI'm your virtual assistant, here to help you explore our next-generation elevator solutions. How can I assist you today?`,
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
    else if (this.containsKeywords(lowerMessage, ['g+1', 'g1', 'two floor', '2 floor'])) {
      response = this.getG1Models();
      quickReplies = ['Calculate Price', 'View G+2 Models', 'Back to Menu'];
    }
    // G+2 Models
    else if (this.containsKeywords(lowerMessage, ['g+2', 'g2', 'three floor', '3 floor', 'cfm', 'best seller'])) {
      response = this.getG2Models();
      quickReplies = ['Calculate Price', 'View G+1 Models', 'Back to Menu'];
    }
    // G+3 Models
    else if (this.containsKeywords(lowerMessage, ['g+3', 'g3', 'four floor', '4 floor'])) {
      response = this.getG3Models();
      quickReplies = ['Calculate Price', 'Request Quote', 'Back to Menu'];
    }
    // Pricing
    else if (this.containsKeywords(lowerMessage, ['price', 'cost', 'budget', 'calculate', 'how much'])) {
      response = this.getPricingInfo();
      quickReplies = ['View Products', 'Calculate Price', 'Back to Menu'];
    }
    // Installation
    else if (this.containsKeywords(lowerMessage, ['install', 'installation', 'setup', 'civil work'])) {
      response = this.getInstallationInfo();
      quickReplies = ['View Products', 'Request Quote', 'Back to Menu'];
    }
    // Maintenance
    else if (this.containsKeywords(lowerMessage, ['maintenance', 'amc', 'service', 'warranty'])) {
      response = this.getMaintenanceInfo();
      quickReplies = ['View AMC Packages', 'Request Quote', 'Back to Menu'];
    }
    // Safety
    else if (this.containsKeywords(lowerMessage, ['safe', 'safety', 'security', 'emergency'])) {
      response = this.getSafetyInfo();
      quickReplies = ['View Products', 'Request Quote', 'Back to Menu'];
    }
    // Customization
    else if (this.containsKeywords(lowerMessage, ['custom', 'design', 'color', 'cabin', 'accessory'])) {
      response = this.getCustomizationInfo();
      quickReplies = ['View Accessories', 'Request Quote', 'Back to Menu'];
    }
    // FAQs
    else if (this.containsKeywords(lowerMessage, ['faq', 'question', 'help', 'info'])) {
      response = this.getFAQOverview();
      quickReplies = ['Installation FAQs', 'Pricing FAQs', 'Safety FAQs', 'Back to Menu'];
    }
    // Contact
    else if (this.containsKeywords(lowerMessage, ['contact', 'phone', 'email', 'call', 'reach'])) {
      response = this.getContactInfo();
      quickReplies = ['Request Quote', 'View Products', 'Back to Menu'];
    }
    // Quote request
    else if (this.containsKeywords(lowerMessage, ['quote', 'quotation', 'estimate'])) {
      response = this.getQuoteInfo();
      quickReplies = ['Calculate Price', 'Contact Us', 'Back to Menu'];
    }
    // Compare models
    else if (this.containsKeywords(lowerMessage, ['compare', 'difference', 'classic vs ultra'])) {
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

We offer three main model categories:

**G+1 Series** (2 Landings)
• Classic: ₹5,00,000 - ₹5,80,000
• Ultra: ₹5,70,000 - ₹6,50,000

**G+2 Series** (3 Landings) ⭐ BEST SELLER
• Classic: ₹5,70,000 - ₹6,80,000
• Ultra: ₹7,20,000+
• Our Customer's Favorite Model (CFM)!

**G+3 Series** (4 Landings)
• Perfect for two-story homes with terrace
• Custom pricing available

All models come in:
• Sizes: 3x3, 3.6x3.6, 4x4 feet
• Door Types: Manual or Auto
• Enclosures: ACP or Glass (1-2 sides)

Which model interests you?`;
  }

  private static getG1Models(): string {
    const g1Models = ELEVATOR_MODELS.filter(m => m.type === 'G+1');
    return `**G+1 Models** (2 Landings)

Perfect for single-story homes or small buildings:

**Classic Series** (MS Cabin):
${g1Models.filter(m => m.category === 'Classic').map(m => 
  `• ${m.name}\n  ₹${(m.basePrice / 100000).toFixed(2)} Lakhs\n  ${m.features.join(', ')}`
).join('\n\n')}

**Ultra Series** (SS304 Cabin):
${g1Models.filter(m => m.category === 'Ultra').map(m => 
  `• ${m.name}\n  ₹${(m.basePrice / 100000).toFixed(2)} Lakhs\n  ${m.features.join(', ')}`
).join('\n\n')}

All prices include GST + Erection Cost`;
  }

  private static getG2Models(): string {
    return `**G+2 Models** ⭐ BEST SELLER (3 Landings)

Our Customer's Favorite Model (CFM)! Perfect for:
• Two-story homes
• Homes with terrace access
• Maximum versatility

**Classic Series** (MS Cabin):
• Manual Door + ACP: ₹5,70,000
• Manual Door + Glass (1 Side): ₹6,40,000
• Manual Door + Glass (2 Sides): ₹6,70,000

**Ultra Series** (SS304 Cabin):
• Manual Door + Glass (1 Side): ₹7,20,000
• Premium finishes and materials

**Why G+2 is Popular:**
✓ Most versatile installation
✓ Perfect size-to-value ratio
✓ 3x3 ft fits most homes
✓ Terrace or closed floor options

All prices include GST + Erection Cost`;
  }

  private static getG3Models(): string {
    return `**G+3 Models** (4 Landings)

Ideal for:
• Two-story homes with terrace
• Apartment-style individual houses
• Families needing maximum accessibility

**Available in Both:**
• Classic Series (MS Cabin)
• Ultra Series (SS304 Cabin)

**Sizes:**
• 3x3 feet (Premium compact)
• 3.6x3.6 feet (Spacious)
• 4x4 feet (Maximum comfort)
• Customized sizes available

**Pricing:**
Custom quotes based on:
• Chosen cabin type
• Door type (Manual/Auto)
• Enclosure type (ACP/Glass)
• Additional accessories

Would you like a personalized quote?`;
  }

  private static getPricingInfo(): string {
    return `💰 **GPlus Elevator Pricing**

**Base Prices by Model:**

**G+1 Series:**
Classic: ₹5.00L - ₹5.80L
Ultra: ₹5.70L - ₹6.50L

**G+2 Series:** ⭐
Classic: ₹5.70L - ₹6.80L
Ultra: ₹7.20L+

**Price Factors:**
• Cabin Type (MS/SS/Gold)
• Door Type (Manual/Auto)
• Enclosure (ACP/Glass)
• Size (3x3, 3.6x3.6, 4x4)
• Accessories

**Payment Plan:**
• 10% - Advance
• 40% - At booking/fabrication
• 45% - Material arrival
• 5% - 80% completion

**What's Included:**
✓ All materials & GST
✓ Professional installation
✓ 1-year warranty
✓ Quality certification
✓ Post-installation support

Use our calculator for exact pricing!`;
  }

  private static getInstallationInfo(): string {
    return `🔧 **Installation Process**

**Space Requirements:**
• Minimal: 3x3 feet (standard)
• No extensive civil work needed
• Core cutting for existing homes

**Timeline:**
Standard Models:
• Fabrication: 10-15 working days
• Installation: 5-10 working days

Customized Models:
• Fabrication: 20-25 working days
• Installation: 10-15 working days

**Pre-Installation (Customer's Part):**
1. Core cutting of roof
2. 3-Phase supply with MCCB
3. Bulkhead lighting
4. Completed plastering & tiling
5. For terrace: 12ft closed structure

**Our Installation Includes:**
✓ Professional setup team
✓ Quality assurance testing
✓ Compliance with building codes
✓ Complete commissioning
✓ User training

**No License Required** for residential installations!

Ready to get started?`;
  }

  private static getMaintenanceInfo(): string {
    return `🛠️ **Maintenance Services**

**Two AMC Options:**

**1. Basic AMC** (₹8,000-17,000/year)
• Quarterly inspections (4/year)
• Preventive maintenance
• Cleaning & lubrication
• Basic adjustments
• Parts NOT included

**2. Comprehensive AMC** (₹30,000-55,000/year)
• Everything in Basic AMC
• All parts replacement included
• Emergency repairs within 24-72 hrs
• 24/7 support availability
• No hidden costs

**What's Covered:**
✓ Motor inspection
✓ Control system checks
✓ Cable & shaft examination
✓ Safety system testing
✓ Lubrication of moving parts
✓ Oil level monitoring
✓ Complete cleaning

**Emergency Service:**
• Response: 6-8 hours
• Available 24/7
• Expert technicians

**Warranty:**
1 year comprehensive + 1 year extended

Protect your investment with professional maintenance!`;
  }

  private static getSafetyInfo(): string {
    return `🛡️ **Safety Features**

**Built-in Safety Systems:**

**Emergency Protection:**
• ARD (Automatic Rescue Device)
• 8-hour battery backup
• Emergency alarm button
• Two-way video calling
• Auto-location transmission

**Door Safety:**
• Multi-beam light curtain
• Auto-reverse on obstruction
• Double safety locks
• Emergency manual release
• Entrapment sensors

**Mechanical Safety:**
• Overspeed governors
• Progressive safety gear
• 150% rated load buffers
• Advanced rope monitoring
• Seismic detection system

**Fire Safety:**
• Fire recall operation
• Firefighter controls
• Smoke detector integration
• Emergency positioning

**Operational Safety:**
• Precise leveling (3mm accuracy)
• Automatic braking system
• Power failure protection
• Overload sensors

**Standards Compliance:**
✓ Exceeds industry standards
✓ Multiple redundant systems
✓ Regular safety inspections
✓ Certified components

Your safety is our priority!`;
  }

  private static getCustomizationInfo(): string {
    return `🎨 **Customization Options**

**Cabin Materials:**
• MS (Mild Steel) - Classic
• SS304 (Stainless Steel) - Ultra
• Gold Plated - Luxury

**Door Types:**
Manual:
• Mesh sliding
• MS/SS swing (half/full vision)

Auto:
• MS auto sliding
• SS auto sliding
• Half/full vision glass

**Enclosures:**
• ACP (Aluminum Composite)
• 8mm Toughened Glass
• 12mm Toughened Glass
• Multi-color glass options

**Control Panels:**
• Acrylic (Standard)
• SS304 (Premium)
• Gold/Rose Gold finish
• Touch screen options

**Security Upgrades:**
• RF & Password (₹10k-15k)
• Fingerprint + Password (₹15k-20k)
• Touch screen interface (₹3k-30k)
• IoT Smart Controller (₹80k)

**Additional:**
• Phase converter (₹20k)
• Custom colors & finishes
• LED lighting options
• Floor announcing system

Create your perfect elevator!`;
  }

  private static getFAQOverview(): string {
    return `❓ **Frequently Asked Questions**

**Popular Questions:**

1️⃣ **Space Requirements**
Minimum 3x3 feet, no extensive civil work

2️⃣ **Installation Time**
1-3 weeks depending on customization

3️⃣ **Safety Standards**
Multiple redundant systems, exceeds codes

4️⃣ **Capacity**
3-5 people or 220 kg

5️⃣ **Power Outage**
ARD system with battery backup

6️⃣ **Maintenance**
AMC recommended, packages available

7️⃣ **Pricing**
₹5L - ₹7.2L based on specifications

8️⃣ **License**
Not required for residential

9️⃣ **Customization**
Extensive options available

🔟 **Warranty**
1 year comprehensive + 1 year extended

**Categories:**
• Installation FAQs
• Pricing FAQs
• Safety FAQs
• Maintenance FAQs
• Technical FAQs

Which topic would you like to explore?`;
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

**Office Hours:**
Monday - Saturday: 9:00 AM - 6:00 PM

**Quick Actions:**
• Request detailed quotation
• Schedule site visit
• Product demonstration
• Technical consultation
• AMC enrollment

**Response Time:**
We typically respond within:
• Phone: Immediate
• Email: Within 24 hours
• WhatsApp: Within 2 hours

**Service Coverage:**
Available for installations across India

How would you like to proceed?`;
  }

  private static getQuoteInfo(): string {
    return `📋 **Request a Quote**

To provide you with an accurate quotation, I need:

**Project Details:**
1. Building type (Residential/Commercial)
2. Number of floors (G+1/G+2/G+3)
3. Preferred size (3x3, 3.6x3.6, 4x4)
4. Model preference (Classic/Ultra)
5. Door type (Manual/Auto)
6. Enclosure type (ACP/Glass)

**Installation Site:**
7. Indoor or outdoor
8. New construction or existing building
9. Available space details

**Contact Information:**
10. Your name
11. Phone number
12. Email address
13. Location/Address

**Additional Requirements:**
• Any special customizations
• Preferred accessories
• Timeline requirements

**Next Steps:**
1. Use our Price Calculator
2. Contact us directly for site visit
3. Get detailed quotation within 24 hrs

Ready to calculate your price?`;
  }

  private static getModelComparison(): string {
    return `⚖️ **Classic vs Ultra Comparison**

**Classic Series:**
✓ MS (Mild Steel) cabin
✓ Powder-coated finish
✓ Acrylic control panels
✓ Cost-effective option
✓ Durable & reliable
✓ Multiple color choices
✓ Perfect for budget-conscious

**Price Range:** ₹5.00L - ₹6.80L

**Ultra Series:**
✓ SS304 stainless steel cabin
✓ Premium rust-resistant
✓ SS control panels
✓ Sleek modern appearance
✓ Enhanced durability
✓ Reflective surfaces
✓ Low maintenance

**Price Range:** ₹5.70L - ₹7.20L+

**Key Differences:**
| Feature | Classic | Ultra |
|---------|---------|-------|
| Cabin | MS | SS304 |
| COP/LOP | Acrylic | SS |
| Auto Door | MS | SS |
| Finish | Powder coat | Polished |
| Corrosion | Resistant | Highly resistant |
| Maintenance | Regular | Minimal |

**Both Include:**
• Same safety features
• Same motor & technology
• Same warranty
• Same installation process

Choose based on budget & aesthetic preference!`;
  }

  private static getDefaultResponse(message: string): string {
    // Try to find related FAQ
    const relatedFAQ = FAQS.find(faq => 
      faq.question.toLowerCase().includes(message) || 
      message.includes(faq.question.toLowerCase().split(' ').slice(0, 3).join(' '))
    );

    if (relatedFAQ) {
      return `**${relatedFAQ.question}**\n\n${relatedFAQ.answer}\n\nIs there anything else you would like to know?`;
    }

    return `I'm here to help with GPlus Elevators! I can assist you with:

• Product information & models
• Pricing & calculations
• Installation process
• Safety features
• Maintenance services
• Customization options
• Quote requests
• Contact information

What would you like to know?`;
  }
}