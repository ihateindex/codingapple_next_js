export default function Cart() {
    let 장바구니 = ['토마토', '파스타'];
    return (
        <div>
            <h4 className="title">Cart</h4>
            <CartItem item={장바구니[0]}></CartItem>
            <CartItem item={장바구니[1]}></CartItem>
        </div>
    );
}

function CartItem(props) {
    return (
        <div className="cart-item">
            <p>{props.item}</p>
            <p>$40</p>
            <p>1개</p>
        </div>
    );
}
