import React from 'react'
import {Link} from 'react-router-dom'

const Order = ({order}) => {

      let date = order.createdAt.slice(0, 10).split('-');
      date = `${date[1]}/${date[2]}/${date[0]}`;
      return (
      <div key={order.id} onClick={() => { }}>
          <h3>{date}</h3>
          <h3>ORDER# {order.id}</h3>
          <h3>STATUS {order.status}</h3>
          {order.products.map(item => {
            return (
              <div key={item.id}>
                <Link to={`/products/${item.id}`}>
                  <img className="order-hist-img" src={item.imageURL} />
                  <div>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      )

}
export default Order;
