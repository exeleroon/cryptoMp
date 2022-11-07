import React from "react";
import TextField from "../components/form/TextField";
import arrowsIcon from '../images/arrowsIcon.png';
import testJson from './testJson.json';
import trcIcon from '../images/teatherIcon.png';
import btcIcon from '../images/btcIcon.png';
import ethIcon from '../images/ethIcon.png';

export default class OrderList extends React.Component {
    state = {

    }

    constructor(props) {
        super(props);

        this.clearSearchTimeOut = this.clearSearchTimeOut.bind(this);
    }

    searchChangedTimeout = null;
    searchText: string = '';
    searchResultList: any[] = testJson;

    clearSearchTimeOut() {
        if (this.searchChangedTimeout) {
            clearTimeout(this.searchChangedTimeout);
        }
    }

    /** @onChangeSearch
     *
     * @param searchText - text input of searching field
     */
    onChangeSearch(searchText: string) {
        this.searchText = searchText.toLowerCase();

        this.clearSearchTimeOut();

        this.searchChangedTimeout = setTimeout(
            () => {
                this.searchResultList = [];

                testJson.forEach(item => {
                    if ((item.clientName).toLowerCase().includes((searchText))) {
                        return this.searchResultList.push(item);
                    }
                })
                this.setState({});
            },
            800
        );
    }

    /**@getTokenImage
     *
     * @param tokenName - name of crypto-Coin currency
     */
    getTokenImage(tokenName) {
        let image;

        switch (tokenName) {
            case 'trc':
                image = trcIcon;
                break;

            case 'btc':
                image = btcIcon;
                break;

            case 'eth':
                image = ethIcon;
                break;

            default:
                image = null;
                break;
        }
        return image;
    }

    render() {

        return (
            <div className={'panel'}>
                <div className={'panel__filter'}>
                    <h1>ORDERS</h1>
                    <div className={'filter__search'}>
                        <TextField
                            label=""
                            placeholder={"Search orders"}
                            size="small"
                            prefix={"search"}
                            value={this.searchText}
                            onChange={(e) => this.onChangeSearch(e.target.value)}
                        />
                    </div>
                </div>

                <ul className={'order__list'}>
                    <li>
                        <div className={'order__list__amount'}>Amount<span className={'arrowIcon'}><img src={arrowsIcon}
                                                                                                        alt={'arrows'}/></span>
                        </div>
                        <div className={'order__list__valueUsd'}>Value in USD<span className={'arrowIcon'}><img
                            src={arrowsIcon} alt={'arrows'}/></span>
                        </div>
                        <div className={'order__list__date'}>Date
                            <span className={'arrowIcon'}>
                            <img src={arrowsIcon} alt={'arrows'}/></span>
                        </div>
                        <div >Invoice</div>
                        <div className={'order__list__client'}>Client</div>
                        <div className={'order__list__network'}>Network</div>
                        <div>Status</div>
                    </li>

                    {this.searchResultList.map((order, key) => {
                        let orderStatus = order.status === 'Confirmed';

                        return (
                            <li key={key} className={!orderStatus && 'order__list__timedOutOrder'}>
                                <div className={'order__list__amount'}>
                                    <img src={this.getTokenImage(order.coinType)} alt={order.coinType}/> {order.amount}
                                </div>
                                <div className={'order__list__greyTxt'}>{order.usdValue}</div>
                                <div>{order.date}</div>
                                <div className={'order__list__doubleText'}>{order.invoiceNumber} <span>{order.invoiceInfo}</span></div>
                                <div className={'order__list__doubleText'}>{order.clientName} <br/> <span>{order.clientEmail}</span></div>
                                <div>{order.network}</div>
                                <div className={orderStatus ? 'order__list__status confirmed' : 'order__list__status timedOut'}>{order.status}</div>
                            </li>
                        )
                    })}

                </ul>

            </div>
        );
    }
}