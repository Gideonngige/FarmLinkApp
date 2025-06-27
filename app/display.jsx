import React from 'react';
import { View } from 'react-native';
import ItemComponent from './store/ItemComponent'; // adjust if in a different folder

export default function DisplayScreen() {
    return (
        <View>
            <ItemComponent itemId={1} /> {/* ✅ Ensure this matches your initial item */}
        </View>
    );
}
