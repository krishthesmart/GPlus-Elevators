import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COMPANY_INFO, FAQS } from '@/constants/elevatorData';

export default function ContactScreen() {
  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${COMPANY_INFO.email}`);
  };

  const handleWebsite = () => {
    Linking.openURL(`https://${COMPANY_INFO.website}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#2E5266', '#1A3344']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Contact Us</Text>
        <Text style={styles.headerSubtitle}>We are here to help</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Quick Contact */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Get in Touch</Text>
            
            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => handleCall(COMPANY_INFO.phone[0])}
              activeOpacity={0.7}
            >
              <View style={styles.contactIcon}>
                <MaterialIcons name="phone" size={24} color="#4CAF50" />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>Call Us</Text>
                <Text style={styles.contactValue}>{COMPANY_INFO.phone[0]}</Text>
                <Text style={styles.contactValue}>{COMPANY_INFO.phone[1]}</Text>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={20} color="#CCC" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactCard}
              onPress={handleEmail}
              activeOpacity={0.7}
            >
              <View style={styles.contactIcon}>
                <MaterialIcons name="email" size={24} color="#2196F3" />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>Email Us</Text>
                <Text style={styles.contactValue}>{COMPANY_INFO.email}</Text>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={20} color="#CCC" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactCard}
              onPress={handleWebsite}
              activeOpacity={0.7}
            >
              <View style={styles.contactIcon}>
                <MaterialIcons name="language" size={24} color="#9C27B0" />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>Visit Website</Text>
                <Text style={styles.contactValue}>{COMPANY_INFO.website}</Text>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={20} color="#CCC" />
            </TouchableOpacity>
          </View>

          {/* Office Hours */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Office Hours</Text>
            <View style={styles.infoCard}>
              <MaterialIcons name="access-time" size={24} color="#FF9800" />
              <View style={styles.infoContent}>
                <Text style={styles.infoText}>Monday - Saturday</Text>
                <Text style={styles.infoTextBold}>9:00 AM - 6:00 PM</Text>
              </View>
            </View>
          </View>

          {/* FAQ Preview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Questions</Text>
            {FAQS.slice(0, 5).map((faq) => (
              <View key={faq.id} style={styles.faqCard}>
                <View style={styles.faqHeader}>
                  <MaterialIcons name="help-outline" size={20} color="#D4AF37" />
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                </View>
                <Text style={styles.faqAnswer} numberOfLines={2}>
                  {faq.answer}
                </Text>
              </View>
            ))}
          </View>

          {/* Request Quote CTA */}
          <TouchableOpacity style={styles.ctaCard} activeOpacity={0.7}>
            <LinearGradient
              colors={['#D4AF37', '#B8941F']}
              style={styles.ctaGradient}
            >
              <MaterialIcons name="request-quote" size={32} color="#FFFFFF" />
              <View style={styles.ctaContent}>
                <Text style={styles.ctaTitle}>Need a Custom Quote?</Text>
                <Text style={styles.ctaSubtitle}>
                  Tell us your requirements and get a detailed quotation
                </Text>
              </View>
              <MaterialIcons name="arrow-forward" size={24} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>

          {/* Support Info */}
          <View style={styles.supportCard}>
            <Text style={styles.supportTitle}>24/7 Emergency Support</Text>
            <Text style={styles.supportText}>
              For urgent repairs or emergency situations, our technicians are available round the clock to assist you.
            </Text>
            <View style={styles.supportBadges}>
              <View style={styles.badge}>
                <MaterialIcons name="verified" size={16} color="#4CAF50" />
                <Text style={styles.badgeText}>Certified</Text>
              </View>
              <View style={styles.badge}>
                <MaterialIcons name="speed" size={16} color="#2196F3" />
                <Text style={styles.badgeText}>Fast Response</Text>
              </View>
              <View style={styles.badge}>
                <MaterialIcons name="star" size={16} color="#FF9800" />
                <Text style={styles.badgeText}>Expert Team</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#D4AF37',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 12,
  },
  contactIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactContent: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#E65100',
  },
  infoTextBold: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E65100',
    marginTop: 2,
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  ctaCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  ctaContent: {
    flex: 1,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  ctaSubtitle: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  supportCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 20,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 8,
  },
  supportText: {
    fontSize: 14,
    color: '#1B5E20',
    lineHeight: 20,
    marginBottom: 16,
  },
  supportBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
});