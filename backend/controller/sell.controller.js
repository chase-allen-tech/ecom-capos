import Cart from './../model/cart.model';
import httpStatus from 'http-status'
import {handleError} from "./util.controller";
import {transporter} from "./util.controller";
import config from "../config/var.config";

export const createCart = async (req, res, next) => {
    let result;
    const {user_id, store_name} = req.body;
    try {
        const existCart = await Cart.findOne({user_id, store_name});
        if (existCart) {
            result = await Cart.findOneAndUpdate({user_id, store_name}, req.body, {new: true});
        } else {
            result = await Cart.create(req.body)
        }
        res.status(httpStatus.CREATED).send(result)
    } catch (e) {
        next(handleError(res, e))
    }
}


export const readCart = async (req, res, next) => {
    try {
        const {user_id, store_name} = req.query;
        const result = await Cart.findOne({user_id, store_name});
        res.status(httpStatus.OK).send(result)
    } catch (e) {
        next(handleError(res, e));
    }
}

export const updateCart = (req, res, next) => {

}

export const removeCart = async (req, res, next) => {
    try {
        await Cart.findOneAndRemove(req.query);
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (e) {
        next(handleError(res, e));
    }
}

export const emailToCustomer = async (req, res, next) => {
    let template = '';
    const {email, cart_id} = req.body;
    const cart = await Cart.findOne({_id: cart_id});
    try {
        template += `<div style="display: block; width: 100%; padding-left: 40%;
                          font-family: Lato;
                          font-size: 24px;
                          font-style: normal;
                          font-weight: 700;
                          line-height: 29px;">
                        <div><b style="margin-bottom: 16px">${cart.store_name}</b></div>
                        <div style="font-weight: 400;">Outlet: ${cart.outlet}</div>
                    </div>`;

        cart.products.forEach(product => {
            template +=
                `<div  style="display: flex;
                      margin-bottom: 10px;
                      font-family: Lato;
                      font-size: 24px;
                      font-style: normal;
                      font-weight: 400;
                      line-height: 29px;
                      letter-spacing: 0em;
                      text-align: left;" >
                      <div style="display: flex; width: 50%">
                            <div>${product.qty}</div>
                            <div style="margin-left: 24px;">`;
                if (product.product_name) {
                    template += `<div>${product.product_name}</div>
                                 <div>
                                   <small>${product.name}</small>
                                 </div>`;
                } else {
                    template += `<div>
                                    ${product.name}
                                 </div>`;
                }

                if (product.discount_value) {
                    template += `<div ><small>Disc: ${product.discount_value}</small></div>`;
                }
                if (product.note) {
                    template += `<div>
                                    <small>Note: ${product.note}</small>
                                 </div>`;
                }
            template += `</div>
                     </div>`;
            const totalPerItem = round2Digit(product.qty * product.retail_price * (1 - product.discount_value / 100));
            template +=
                    `<div style="width: 50%">
                            <div>${totalPerItem}</div>`;
            if (product.discount_value > 0) {
                template += `<div style="text-decoration: line-through">
                                <small>${product.qty * product.retail_price}</small>
                            </div>`;
            }
            template +=
                     `</div>
                </div>`;
        });

        template +=
                `<div  style="
                      border-top: 1px solid;
                      margin-top: 16px;
                      padding-bottom: 16px;
                      padding-left: 48px;
                      border-bottom: 1px solid;
                      padding-top: 24px;
                      font-family: Lato;
                      font-size: 24px;
                      font-style: normal;
                      font-weight: 400;
                      line-height: 29px;
                      letter-spacing: 0em;
                      text-align: left;
                      ">
                      <div style="display: flex">
                            <div style="width: 50%">Sub-total</div>
                            <div style="width: 50%">${cart.subtotal}</div>
                      </div>`;
        if (cart.discount_value > 0) {
            template +=`<div style="display: flex">
                                <div style="width: 50%">Additional Discount</div>
                                <div style="width: 50%">
                                  ${cart.discount_value} ${cart.discount_symbol}
                                </div>
                        </div>`;
        }
        if (cart.tax) {
            template += `<div style="display: flex; justify-content: space-between">
                            <div style="width: 50%">Tax</div>
                            <div style="width: 50%">$ ${cart.tax}</div>
                          </div>`;

        }
        template +=
                `</div>`;

        template +=
                `<div style="
                          padding-top: 16px;
                          display: flex;
                          font-family: Lato;
                          font-size: 24px;
                          font-style: normal;
                          font-weight: 400;
                          line-height: 29px;
                          letter-spacing: 0em;
                          text-align: left;
                          margin-bottom: 16px;
                          padding-bottom: 16px;
                          border-bottom: 1px solid;
                        ">
                          <div style="width: 50%;font-weight: bold">
                            Sale Total <small>${cart.total_items} items</small>
                          </div>
                          <div style="width: 50%;">${cart.total}</div>
                </div>`;

        cart.payments.forEach(payment => {
            const date = payment.created.toString().split('T')[0];
            template +=
                `<div style="padding-left: 48px">
                      <div style="display: flex;
                           font-family: Lato;
                           font-size: 24px;
                           font-style: normal;
                           font-weight: 400;
                           line-height: 29px;
                           letter-spacing: 0em;
                           text-align: left;
                           margin-bottom: 16px;
                           padding-bottom: 16px;
                           border-bottom: 1px solid;" >
                            <div style="width: 50%;">
                                  <div>
                                    ${payment.type}
                                  </div>
                                  <div>
                                    <small>${date}</small>
                                  </div>
                            </div>
                            <div style="width: 50%;">${payment.amount}</div>
                      </div>      
                </div>`;
        });
        template +=
                `<div style="display: flex;
                           margin-bottom: 16px;
                           padding-bottom: 16px; ">
                        <div style="
                              font-weight: bold;
                              font-family: Lato;
                              font-size: 24px;
                              font-style: normal;
                              line-height: 29px;
                              letter-spacing: 0em;
                              text-align: left;
                              margin-bottom: 16px;
                              padding-bottom: 16px;
                             width: 50%;">Change</div>
                        <div style="width: 50%">${cart.change}</div>
               </div>`;
        const option = {
            to: email,
            from: config.supportEmail,
            subject: `Receipt/Tax Invoice # ${cart_id}`,
            html: template,
        };
        transporter.sendMail(option, (err, info) => {
            if (err) {
                console.log('error occurred while send mail', err)
            } else {
                res.status(httpStatus.OK).send(info)
            }
        });
    } catch (e) {
        next(handleError(res, e))
    }
}

function round2Digit(number) {
    const result = parseFloat(number).toFixed(2);
    return   number ? result : 0;
}
