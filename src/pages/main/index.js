import { Component } from "react";
import api from '../../services/api'
import { Link } from "react-router-dom";
import './styles.css'

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/health-plans?PageIndex=${page}&PageSize=4`)

        const { data, ...productInfo } = response.data

        this.setState({ products: data, productInfo, page })
    }

    prevPage = () => {
        const { page, productInfo } = this.state

        if (page === 1) return

        const pageNumber = page - 1

        this.loadProducts(pageNumber)
    }

    nextPage = () => {
        const { page, productInfo } = this.state

        if (page === productInfo.lastPage) return;

        const pageNumber = page + 1

        this.loadProducts(pageNumber)
    }

    render() {
        const { products, page, productInfo } = this.state

        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product.Id}>
                        <strong>{product.Name}</strong>
                        <p>{product.Id}</p>
                        <Link to={`/products/${product.Id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.lastPage} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    }
}