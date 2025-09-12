import { useCart } from "../context/CartContext";
import { Button, Card } from ".";

export const CartList = () => {
  const { cart, updateCart, removeFromCart } = useCart();

  return (
    <div>
      {cart.map(item => (
        <Card key={item.id} title={item.name}>
          <p>Price: ${item.price}</p>
          <p>Qty: {item.quantity}</p>
          <Button onClick={() => updateCart(item.id, item.quantity + 1)}>+</Button>
          <Button onClick={() => updateCart(item.id, item.quantity - 1)}>-</Button>
          <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
        </Card>
      ))}
    </div>
  );
};
