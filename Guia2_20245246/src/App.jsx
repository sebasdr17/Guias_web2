import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { db } from './data/db'
import Guitar from './components/Guitar'

const initialCart = JSON.parse(localStorage.getItem('cart')) || []

export default function App() {
  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart)
  

  function addToCart(guitar) {
    const itemIndex= cart.findIndex((item) => guitar.id === item.id);
    console.log(itemIndex);
    if(itemIndex=== -1){
      guitar.quantity=1;
      setCart([...cart, guitar]);
    }
    else{
      const updatedCart= [...cart];
      updatedCart[itemIndex].quantity ++;
      setCart(updatedCart);
    }
  
    
  }

  function removeFromCart(id) {
    setCart(cart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map(guitar => 
      guitar.id === id && guitar.quantity < 5 
        ? { ...guitar, quantity: guitar.quantity + 1 } 
        : guitar
    )
    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map(guitar => 
      guitar.id === id && guitar.quantity > 1 
        ? { ...guitar, quantity: guitar.quantity - 1 } 
        : guitar
    )
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const total = cart.reduce((total, guitar) => total + (guitar.price * guitar.quantity), 0)

  return (
    <>
      <Header cart={cart} total={total} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} clearCart={clearCart} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar)=>(
            <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart}  />
          ))}
          
          
        </div>
      </main>
      <Footer />
    </>
  )
}

