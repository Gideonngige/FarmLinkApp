import { Button, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { reduceQuantity } from './itemsSlice';

const ItemComponent = ({ itemId }) => {
    const dispatch = useDispatch();

    const item = useSelector(state =>
        state.items.items.find(i => i.id === itemId)
    );

    const handleBuy = () => {
        if (item && item.quantity >= 2) {
            dispatch(reduceQuantity({ itemId: item.id, amount: 2 }));
        } else {
            alert('Not enough quantity available.');
        }
    };

    if (!item) {
        return (
            <View>
                <Text>Item not found or loading...</Text>
            </View>
        );
    }

    return (
        <View>
            <Text>{item.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Button title="Buy 2" onPress={handleBuy} />
        </View>
    );
};

export default ItemComponent;
