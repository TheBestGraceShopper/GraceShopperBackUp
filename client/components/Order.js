import React from 'react'
import {Link} from 'react-router-dom'
import user from '../store/user';

const Order = ({order}) => {

      let Date = order.id ? order.createdAt.slice(0, 10).split('-') : null;
      let date = Date ? `${Date[1]}/${Date[2]}/${Date[0]}` : null
      return (
        order.id ?
      <div key={order.id} onClick={() => { }}>
          <h3 className="margin-left">{date}</h3>
          <h3 className="order margin-left" >ORDER# {order.id}</h3>
          {order.products.map(item => {
            return (
              <div key={item.id}>
                <Link to={`/products/${item.id}`}>
                  <img className="margin-left order-hist-img" src={item.imageURL} />
                  <div>
                    <p className="margin-left order-text">{item.name}</p>
                    <p className="margin-left order-text order-price">${item.price}</p>
                  </div>
                </Link>
              </div>
            )
          })}
        </div> : 'No existing orders'
      )

}
export default Order;
