import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ELEVATOR_MODELS, ACCESSORIES } from '@/constants/elevatorData';

export default function CalculatorScreen() {
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);

  const model = ELEVATOR_MODELS.find(m => m.id === selectedModel);
  
  const accessoriesTotal = selectedAccessories.reduce((sum, accId) => {
    const accessory = ACCESSORIES.find(a => a.id === accId);
    return sum + (accessory?.price || 0);
  }, 0);

  const totalPrice = (model?.basePrice || 0) + accessoriesTotal;

  const toggleAccessory = (accId: string) => {
    setSelectedAccessories(prev =>
      prev.includes(accId)
        ? prev.filter(id => id !== accId)
        : [...prev, accId]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#2E5266', '#1A3344']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Price Calculator</Text>
        <Text style={styles.headerSubtitle}>Build your perfect elevator</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Model Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Model</Text>
            <View style={styles.modelGrid}>
              {ELEVATOR_MODELS.slice(0, 8).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.modelCard,
                    selectedModel === item.id && styles.modelCardSelected,
                  ]}
                  onPress={() => setSelectedModel(item.id)}
                  activeOpacity={0.7}
                >
                  <MaterialIcons
                    name="elevator"
                    size={24}
                    color={selectedModel === item.id ? '#D4AF37' : '#666'}
                  />
                  <Text style={[
                    styles.modelType,
                    selectedModel === item.id && styles.modelTypeSelected,
                  ]}>
                    {item.type}
                  </Text>
                  <Text style={[
                    styles.modelCategory,
                    selectedModel === item.id && styles.modelCategorySelected,
                  ]}>
                    {item.category}
                  </Text>
                  <Text style={[
                    styles.modelPrice,
                    selectedModel === item.id && styles.modelPriceSelected,
                  ]}>
                    ₹{(item.basePrice / 100000).toFixed(2)}L
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Model Details */}
          {model && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Model Details</Text>
              <View style={styles.detailsCard}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Type:</Text>
                  <Text style={styles.detailValue}>{model.type}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Category:</Text>
                  <Text style={styles.detailValue}>{model.category}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Door:</Text>
                  <Text style={styles.detailValue}>{model.doorType}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Enclosure:</Text>
                  <Text style={styles.detailValue}>{model.enclosure}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Sizes:</Text>
                  <Text style={styles.detailValue}>{model.sizes.join(', ')} ft</Text>
                </View>
              </View>
            </View>
          )}

          {/* Accessories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add Accessories (Optional)</Text>
            <View style={styles.accessoriesGrid}>
              {ACCESSORIES.slice(0, 8).map((accessory) => (
                <TouchableOpacity
                  key={accessory.id}
                  style={[
                    styles.accessoryCard,
                    selectedAccessories.includes(accessory.id) && styles.accessoryCardSelected,
                  ]}
                  onPress={() => toggleAccessory(accessory.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.accessoryHeader}>
                    <MaterialIcons
                      name={selectedAccessories.includes(accessory.id) ? 'check-box' : 'check-box-outline-blank'}
                      size={24}
                      color={selectedAccessories.includes(accessory.id) ? '#4CAF50' : '#CCC'}
                    />
                  </View>
                  <Text style={styles.accessoryName}>{accessory.name}</Text>
                  <Text style={styles.accessoryPrice}>+₹{(accessory.price / 1000).toFixed(0)}k</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Price Summary */}
          {model && (
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Price Summary</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Base Model</Text>
                <Text style={styles.summaryValue}>
                  ₹{(model.basePrice / 100000).toFixed(2)}L
                </Text>
              </View>

              {selectedAccessories.length > 0 && (
                <>
                  {selectedAccessories.map(accId => {
                    const acc = ACCESSORIES.find(a => a.id === accId);
                    return acc ? (
                      <View key={accId} style={styles.summaryRow}>
                        <Text style={styles.summaryLabelSmall}>{acc.name}</Text>
                        <Text style={styles.summaryValueSmall}>
                          +₹{(acc.price / 1000).toFixed(0)}k
                        </Text>
                      </View>
                    ) : null;
                  })}
                  
                  <View style={styles.summaryDivider} />
                  
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Accessories Total</Text>
                    <Text style={styles.summaryValue}>
                      ₹{(accessoriesTotal / 100000).toFixed(2)}L
                    </Text>
                  </View>
                </>
              )}

              <View style={styles.summaryDivider} />

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Price</Text>
                <Text style={styles.totalValue}>
                  ₹{(totalPrice / 100000).toFixed(2)}L
                </Text>
              </View>

              <Text style={styles.summaryNote}>
                *Includes GST and erection cost
              </Text>

              <TouchableOpacity style={styles.quoteButton} activeOpacity={0.7}>
                <Text style={styles.quoteButtonText}>Request Quote</Text>
                <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}

          {!model && (
            <View style={styles.emptyState}>
              <MaterialIcons name="calculate" size={64} color="#CCC" />
              <Text style={styles.emptyStateText}>
                Select a model to calculate price
              </Text>
            </View>
          )}
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
  modelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  modelCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  modelCardSelected: {
    borderColor: '#D4AF37',
    backgroundColor: '#FFF9E6',
  },
  modelType: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 8,
  },
  modelTypeSelected: {
    color: '#D4AF37',
  },
  modelCategory: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  modelCategorySelected: {
    color: '#B8941F',
  },
  modelPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  modelPriceSelected: {
    color: '#D4AF37',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  accessoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  accessoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  accessoryCardSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#F1F8F4',
  },
  accessoryHeader: {
    marginBottom: 8,
  },
  accessoryName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  accessoryPrice: {
    fontSize: 12,
    color: '#666',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#333',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  summaryLabelSmall: {
    fontSize: 13,
    color: '#666',
  },
  summaryValueSmall: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#D4AF37',
  },
  summaryNote: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  quoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4AF37',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 16,
    gap: 8,
  },
  quoteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
});