export default class Validate {
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    static validatePassword(password) {
        return password.length >= 8;
    }
    static validateName(name) {
        return name.length > 0;
    }
    static validateLength(text, length) {
        return text.length >= length;
    }
    static validatePhone(phone) {
        const re = /^\d{10}$/;
        return re.test(phone);
    }
    static validateAddress(address) {
        return address.length > 0;
    }
    static validateCity(city) {
        return city.length > 0;
    }
    static validateState(state) {
        return state.length > 0;
    }
    static validateZip(zip) {
        const re = /^\d{5}$/;
        return re.test(zip);
    }
    static validateCountry(country) {
        return country.length > 0;
    }
    static validateCardName(cardName) {
        return cardName.length > 0;
    }
    static validateCardNumber(cardNumber) {
        const re = /^\d{16}$/;
        return re.test(cardNumber);
    }
    static validateCardExpiry(cardExpiry) {
        const re = /^\d{2}\/\d{2}$/;
        return re.test(cardExpiry);
    }
    static validateCardCvc(cardCvc) {
        const re = /^\d{3}$/;
        return re.test(cardCvc);
    }
    static validateCardZip(cardZip) {
        const re = /^\d{5}$/;
        return re.test(cardZip);
    }

    static validateProduct(product) {
        return product.length > 0;
    }
    static validateQuantity(quantity) {
        return quantity > 0;
    }
}
