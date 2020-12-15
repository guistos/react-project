import { Component } from "react";
import api from "../../services/api";
import "./styles.css"

export default class Product extends Component {
    state = {
        product: {}
    }

    async componentDidMount() {
        const { id } = this.props.match.params

        const response = await api.get(`/health-plans/${id}`)

        this.setState({ product: response.data.data })
    }

    render() {
        const { product } = this.state
        return (
            <div className="product-info">
                <h1>{product.Name}</h1>
                <p>{product.Id}</p>
            </div>

        )
    }
}