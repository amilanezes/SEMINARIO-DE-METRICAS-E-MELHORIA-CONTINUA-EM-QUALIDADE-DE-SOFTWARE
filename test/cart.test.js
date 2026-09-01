const Cart = require('../src/cart');

describe('Cart - addItem', () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  test('adiciona um item válido ao carrinho', () => {
    cart.addItem('Teclado', 150, 2);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0]).toEqual({ name: 'Teclado', price: 150, quantity: 2 });
  });

  test('lança erro se o nome estiver vazio', () => {
    expect(() => cart.addItem('', 100, 1)).toThrow('Nome do produto é obrigatório');
  });

  test('lança erro se o preço for zero ou negativo', () => {
    expect(() => cart.addItem('Mouse', 0, 1)).toThrow('Preço deve ser um número maior que zero');
    expect(() => cart.addItem('Mouse', -10, 1)).toThrow('Preço deve ser um número maior que zero');
  });

  test('lança erro se a quantidade não for um inteiro positivo', () => {
    expect(() => cart.addItem('Monitor', 800, 0)).toThrow(
      'Quantidade deve ser um número inteiro maior que zero'
    );
    expect(() => cart.addItem('Monitor', 800, 1.5)).toThrow(
      'Quantidade deve ser um número inteiro maior que zero'
    );
  });
});

describe('Cart - removeItem', () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
    cart.addItem('Teclado', 150, 1);
  });

  test('remove um item existente', () => {
    cart.removeItem('Teclado');
    expect(cart.items).toHaveLength(0);
  });

  test('lança erro ao remover item inexistente', () => {
    expect(() => cart.removeItem('Cadeira')).toThrow('Item "Cadeira" não encontrado no carrinho');
  });
});

describe('Cart - getSubtotal', () => {
  test('calcula o subtotal corretamente com múltiplos itens', () => {
    const cart = new Cart();
    cart.addItem('Teclado', 150, 2); // 300
    cart.addItem('Mouse', 80, 1); // 80
    expect(cart.getSubtotal()).toBe(380);
  });

  test('retorna zero para carrinho vazio', () => {
    const cart = new Cart();
    expect(cart.getSubtotal()).toBe(0);
  });
});

describe('Cart - validateCoupon', () => {
  test('retorna 0 quando nenhum cupom é informado', () => {
    expect(Cart.validateCoupon()).toBe(0);
    expect(Cart.validateCoupon('')).toBe(0);
  });

  test('retorna o percentual correto para cupons válidos', () => {
    expect(Cart.validateCoupon('DESCONTO10')).toBe(0.1);
    expect(Cart.validateCoupon('desconto20')).toBe(0.2);
  });

  test('lança erro para cupom inválido', () => {
    expect(() => Cart.validateCoupon('NAOEXISTE')).toThrow('Cupom "NAOEXISTE" inválido');
  });
});

describe('Cart - getTotal', () => {
  test('calcula o total sem cupom', () => {
    const cart = new Cart();
    cart.addItem('Teclado', 150, 2); // 300
    expect(cart.getTotal()).toBe(300);
  });

  test('aplica desconto de cupom válido corretamente', () => {
    const cart = new Cart();
    cart.addItem('Teclado', 150, 2); // 300
    expect(cart.getTotal('DESCONTO10')).toBe(270);
  });
});

describe('Cart - getItemCount', () => {
  test('soma as quantidades de todos os itens', () => {
    const cart = new Cart();
    cart.addItem('Teclado', 150, 2);
    cart.addItem('Mouse', 80, 3);
    expect(cart.getItemCount()).toBe(5);
  });
});

describe('Cart - clear', () => {
  test('esvazia o carrinho', () => {
    const cart = new Cart();
    cart.addItem('Teclado', 150, 1);
    cart.clear();
    expect(cart.items).toHaveLength(0);
  });
});
