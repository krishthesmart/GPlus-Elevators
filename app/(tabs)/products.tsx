import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ELEVATOR_MODELS } from '@/constants/elevatorData';

export default function ProductsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<'G+1' | 'G+2' | 'G+3'>('G+2');

  const filteredModels = ELEVATOR_MODELS.filter(m => m.type === selectedCategory);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#2E5266', '#1A3344']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Product Catalog</Text>
        <Text style={styles.headerSubtitle}>Explore our elevator solutions</Text>
      </LinearGradient>

      <View style={styles.categoryContainer}>
        {(['G+1', 'G+2', 'G+3'] as const).map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
            {category === 'G+2' && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>⭐ Best</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {filteredModels.map((model) => (
            <View key={model.id} style={styles.productCard}>
              <View style={styles.productHeader}>
                <View style={styles.productIconContainer}>
                  <MaterialIcons name="elevator" size={32} color="#D4AF37" />
                </View>
                <View style={styles.productHeaderText}>
                  <Text style={styles.productName}>{model.name}</Text>
                  <Text style={styles.productCategory}>
                    {model.category} Series
                  </Text>
                </View>
              </View>

              <Text style={styles.productDescription}>{model.description}</Text>

              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Starting from</Text>
                <Text style={styles.price}>
                  ₹{(model.basePrice / 100000).toFixed(2)}L
                </Text>
              </View>

              <View style={styles.featuresContainer}>
                {model.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.sizesContainer}>
                <Text style={styles.sizesLabel}>Available Sizes:</Text>
                <View style={styles.sizeChips}>
                  {model.sizes.map((size, index) => (
                    <View key={index} style={styles.sizeChip}>
                      <Text style={styles.sizeChipText}>{size} ft</Text>
                    </View>
                  ))}
                </View>
              </View>

              <TouchableOpacity style={styles.detailsButton} activeOpacity={0.7}>
                <Text style={styles.detailsButtonText}>View Details</Text>
                <MaterialIcons name="arrow-forward" size={20} color="#D4AF37" />
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.infoCard}>
            <MaterialIcons name="info" size={24} color="#2196F3" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Need Help Choosing?</Text>
              <Text style={styles.infoText}>
                Chat with our assistant or use the calculator to find your perfect elevator
              </Text>
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
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  categoryButtonActive: {
    borderColor: '#D4AF37',
    backgroundColor: '#FFF9E6',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  categoryTextActive: {
    color: '#D4AF37',
  },
  badge: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#D4AF37',
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  productIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productHeaderText: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  productCategory: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
    gap: 8,
  },
  priceLabel: {
    fontSize: 13,
    color: '#999',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#D4AF37',
  },
  featuresContainer: {
    marginBottom: 16,
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
  },
  sizesContainer: {
    marginBottom: 16,
  },
  sizesLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  sizeChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  sizeChipText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    gap: 8,
  },
  detailsButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#D4AF37',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#1565C0',
    lineHeight: 18,
  },
});