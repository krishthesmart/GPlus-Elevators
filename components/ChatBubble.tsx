import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { ChatMessage } from '@/types/elevator';

interface ChatBubbleProps {
  message: ChatMessage;
  onQuickReply?: (reply: string) => void;
}

export default function ChatBubble({ message, onQuickReply }: ChatBubbleProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 15 });
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const isBot = message.type === 'bot';

  return (
    <Animated.View style={[styles.container, animatedStyle, isBot ? styles.botContainer : styles.userContainer]}>
      <View style={[styles.bubble, isBot ? styles.botBubble : styles.userBubble]}>
        <Text style={[styles.text, isBot ? styles.botText : styles.userText]}>
          {message.content}
        </Text>
        
        {isBot && (
          <Text style={styles.timestamp}>
            {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        )}
      </View>

      {isBot && message.quickReplies && message.quickReplies.length > 0 && (
        <View style={styles.quickReplies}>
          {message.quickReplies.map((reply, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickReplyButton}
              onPress={() => onQuickReply?.(reply)}
              activeOpacity={0.7}
            >
              <Text style={styles.quickReplyText}>{reply}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 12,
  },
  botContainer: {
    alignItems: 'flex-start',
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  botBubble: {
    backgroundColor: '#F5F5F5',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#2E5266',
    borderBottomRightRadius: 4,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
  },
  botText: {
    color: '#1A1A1A',
  },
  userText: {
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    textAlign: 'right',
  },
  quickReplies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  quickReplyButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D4AF37',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickReplyText: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '600',
  },
});