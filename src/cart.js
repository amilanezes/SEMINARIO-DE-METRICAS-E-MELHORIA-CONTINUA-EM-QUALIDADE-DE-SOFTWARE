/**
 * Lógica de um carrinho de compras simples.
 * Usado como estudo de caso para demonstrar testes unitários
 * integrados a um pipeline de CI/CD com Quality Gate.
 */
class Cart {
  constructor() {
    this.items = [];
  }

  /**
   * Adiciona um item ao carrinho.
   * @param {string} name - Nome do produto.
   * @param {number} price - Preço unitário (deve ser > 0).
   * @param {number} quantity - Quantidade (deve ser inteiro > 0).
   */
  addItem(name, price, quantity) {
    if (!name || typeof name !== 'string') {
      throw new Error('Nome do produto é obrigatório');
    }
    if (typeof price !== 'number' || price <= 0) {
      throw new Error('Preço deve ser um número maior que zero');
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Quantidade deve ser um número inteiro maior que zero');
    }

    this.items.push({ name, price, quantity });
    return this.items;
  }

  /**
   * Remove um item do carrinho pelo nome.
   */
  removeItem(name) {
    const index = this.items.findIndex((item) => item.name === name);
    if (index === -1) {
      throw new Error(`Item "${name}" não encontrado no carrinho`);
    }
    this.items.splice(index, 1);
    return this.items;
  }

  /**
   * Calcula o subtotal (soma de preço * quantidade de todos os itens).
   */
  getSubtotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  /**
   * Valida um cupom de desconto e retorna o percentual correspondente (0 a 1).
   * Cupons aceitos: DESCONTO10 (10%), DESCONTO20 (20%), FRETEGRATIS (0%, tratado à parte).
   */
  static validateCoupon(code) {
    const coupons = {
      DESCONTO10: 0.1,
      DESCONTO20: 0.2,
    };

    if (!code) {
      return 0;
    }

    const normalized = code.trim().toUpperCase();
    if (!(normalized in coupons)) {
      throw new Error(`Cupom "${code}" inválido`);
    }

    return coupons[normalized];
  }

  /**
   * Calcula o total aplicando um cupom de desconto opcional.
   */
  getTotal(couponCode) {
    const subtotal = this.getSubtotal();
    const discount = Cart.validateCoupon(couponCode);
    return Number((subtotal - subtotal * discount).toFixed(2));
  }

  /**
   * Retorna a quantidade total de itens (soma das quantidades).
   */
  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  /**
   * Esvazia o carrinho.
   */
  clear() {
    this.items = [];
  }

  /**
   * Aplica desconto adicional por volume de compra (sem cobertura de testes proposital).
   * @param {number} minQuantity - Quantidade mínima de itens para o desconto extra.
   */
  applyBulkDiscount(minQuantity) {
    const totalItems = this.getItemCount();
    if (totalItems < minQuantity) {
      return this.getSubtotal();
    }
    let extraDiscount = 0;
    if (totalItems >= 20) {
      extraDiscount = 0.15;
    } else if (totalItems >= 10) {
      extraDiscount = 0.1;
    } else {
      extraDiscount = 0.05;
    }
    const subtotal = this.getSubtotal();
    return Number((subtotal - subtotal * extraDiscount).toFixed(2));
  }
}

module.exports = Cart;
