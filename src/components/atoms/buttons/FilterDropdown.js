import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

const FilterDropdown = ({ selected, onSelect }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    setOpen(false);
    onSelect(value);
  };

  const currentLabel = selected === 'my' ? '📓 내 일기' : '👥 팔로잉 일기';

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.trigger} onPress={() => setOpen(prev => !prev)} activeOpacity={0.8}>
        <Text style={styles.label}>{currentLabel}</Text>
        <Feather name={open ? 'chevron-up' : 'chevron-down'} size={18} color="#b881c2" />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => handleSelect('my')} style={styles.item}>
            <Text style={styles.itemText}>📓 내 일기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelect('follower')} style={styles.item}>
            <Text style={styles.itemText}>👥 팔로잉 일기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: Platform.OS === 'android' ? 20 : 10,
    alignItems: 'center',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent', 
    borderRadius: 22,
    borderWidth: 2, 
    borderColor: '#b881c2', 
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#b881c2',
    marginRight: 6,
  },
  dropdown: {
    position: 'absolute',
    top: 46,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    width: 150,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    borderWidth: 1, 
    borderColor: '#b881c2', 
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  itemText: {
    fontSize: 14,
    color: '#b881c2', 
    fontWeight: '500',
  },
});

export default FilterDropdown;