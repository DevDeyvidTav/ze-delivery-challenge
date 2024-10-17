const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const products = [{
    id: 1,
    name: 'Guaraná Antarctica 2L',
    price: 7.79,
    thumb: 'https://www.catalogoambev.com.br/images/uploads/artes-finais/4bddaa2311de7e142511ecde1a88daeb.png'
}, {
    id: 2,
    name: 'Corona Extra 330ml',
    price: 5.79,
    thumb: 'https://www.catalogoambev.com.br/images/uploads/artes-finais/4518362b24dedc7d296abf5590d6184c.png'
}, {
    id: 3,
    name: 'Do Bem Suco de Laranja Integral 1',
    price: 8.65,
    thumb: 'https://www.catalogoambev.com.br/images/uploads/artes-finais/53780b507bafd1a4bfb6b006084a2460.png'
}, {
    id: 4,
    name: 'Stella Artois 330 ml',
    price: 4.99,
    thumb: 'https://www.catalogoambev.com.br/images/uploads/artes-finais/fb31bc752cf7e0792f07da456c4ad8d7.png'
}, {
    id: 5,
    name: 'Pepsi 2L',
    price: 5.99,
    thumb: 'https://www.catalogoambev.com.br/images/uploads/artes-finais/0a0a9d04f43c521b99d8493e01839ad0.png'
}, {
    id: 6,
    name: 'Spaten 350ml',
    price: 3.79,
    thumb: 'https://www.catalogoambev.com.br/images/uploads/artes-finais/248fa97787be649355fadb5a91922977.png'
}, {
    id: 7,
    name: 'Gatorade Limão 500 ml',
    price: 4.29,
    thumb: 'https://www.catalogoambev.com.br/images/uploads/artes-finais/b533ac0b75e5650d675885609dbaa69d.png'
}, {
    id: 8,
    name: 'Bohemia lata',
    price: 3.09,
    thumb: 'https://www.catalogoambev.com.br/images/uploads/artes-finais/0661f839c8e9529cc445e6296c7c613e.png'
}, {
    id: 9,
    name: 'Colorado Ribeirão Lager 410 ml',
    price: 4.99,
    thumb: 'https://www.catalogoambev.com.br/images/uploads/artes-finais/8fe31e103d212ae0d67c477607c9b70d.png'
}, {
    id: 10,
    name: 'Becks 350ml',
    price: 4.79,
    thumb: 'https://www.catalogoambev.com.br/images/uploads/artes-finais/d873e80735af954750ce353c9ab5fbcf.png'
}, {
    id: 11,
    name: 'Cerveja Original lata',
    price: 3.49,
    thumb: 'https://www.catalogoambev.com.br/images/uploads/artes-finais/b1748141f31dad82332e7f9e32fde7f2.png'
}, {
    id: 12,
    name: 'Brahma Duplo Malte 350 ml',
    price: 3.19,
    thumb: 'https://www.catalogoambev.com.br/images/uploads/artes-finais/1f24a00980933ae09205d02ff3e4e3ac.png'
}, {
    id: 13,
    name: 'Budweiser 350 ml',
    price: 4.49,
    thumb: 'https://www.catalogoambev.com.br/images/uploads/artes-finais/fc76daeb00584a809b7d9aac0a85e4fb.png'
}, {
    id: 14,
    name: 'Guarana Zero 350ml',
    price: 2.49,
    thumb: 'https://www.catalogoambev.com.br/images/uploads/artes-finais/e3aedfe1d0d68a65187d3d6f838451e0.png'
}, {
    id: 15,
    name: 'Hoegaarden',
    price: 7.9,
    thumb: 'https://www.catalogoambev.com.br/images/uploads/artes-finais/31413028d0b62e55a5fe7172499bc3a7.png'
}];

const takeProducts = () => {
    const randomSize = Math.floor((Math.random() * (10 - 1) + 1));
    const randomQuantity = () => Math.floor((Math.random() * (5 - 1) + 1));

    return [...products].splice(0, randomSize).map(product => {
        product.quantity = randomQuantity();
        return product;
    });
}

const randomId = () => {
    return (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
}

const randomPaymentStatus = () => {
    const paymentsStatus = ['PAID', 'REJECTED'];
    return paymentsStatus[Math.floor(Math.random() * paymentsStatus.length)];
}

server.use(middlewares);

server.get('/products', (req, res) => {
    res.jsonp(products);
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.url === '/products' && req.method !== 'GET') {
        throw 'Utilizar somente GET no /products'
    }

    if (req.url === '/transactions') {
        if (req.method === 'POST') {
            const openFridgeDate = new Date();
            const closeFridgeDate = new Date(openFridgeDate.getTime() + 1 * 60000); // adiciona 1 min

            setTimeout(() => {
                req.body = {
                    id: randomId(),
                    openFridge: openFridgeDate,
                    closeFridge: closeFridgeDate,
                    products: takeProducts()
                };
                next();
            }, 3000);
        } else if (req.method !== 'GET') {
            throw 'Utilizar somente GET ou POST no /transactions'
        } else {
            setTimeout(next, 500);
        }
    } else if (req.url === '/payments') {
        if (req.method === 'POST') {
            if (
                !req.body
                || !req.body.transactionId
                || !req.body.amount
            ) {
                throw 'Deve ser informado os campos transactionId e amount no body para o pagamento'
            }

            // const openFridgeDate = new Date();
            // const closeFridgeDate = new Date(openFridgeDate.getTime() + 1*60000); // adiciona 1 min

            setTimeout(() => {
                req.body = {
                    id: randomId(),
                    paymentDate: new Date(),
                    transactionId: req.body.transactionId,
                    amount: req.body.amount,
                    status: randomPaymentStatus()
                };
                next();
            }, 1000);
        } else if (req.method !== 'GET') {
            throw 'Utilizar somente GET ou POST no /transactions'
        } else {
            setTimeout(next, 500);
        }
    } else {
        setTimeout(next, 500);
    }
});

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});