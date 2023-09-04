const client = require('./db_Connect');

class DBConntroller {
    async login(nameDB, select = [], objWhere = {}) {
        let where = ""
        for (const key in objWhere) {
            where += `${key}='${objWhere[key]}' and `;
        };
        where += "true";
        const str = `SELECT ${select} FROM ${nameDB}
        WHERE ${where};`;
        try {
            let data = await client.query(str);
            return data.rows;
        } catch (error) {
            return error;
        }
    }
    async get_users(user_id) {
        let where = user_id ? ` WHERE user_id = ${user_id}` : ``;
        const str = `SELECT * FROM users${where};`;
        try {
            let data = await client.query(str);
            return data.rows;
        } catch (error) {
            return error;
        }
    }

    async registration(login, password, admin, user_id) {
        const str = user_id ? `DELETE FROM users WHERE user_id = ${user_id}` :
            `INSERT INTO users (login, password, admin) VALUES ('${login}', '${password}', ${admin})`;
        try {
            let data = await client.query(str);
            return data;
        } catch (error) {
            return error;
        }
    }

    async add_new_product(product) {
        let { name, price, url, category, exp_date, amount, description, brend } = product;
        const str = `INSERT INTO products (name, price, url, rateAmount, category, exp_date, amount, description, brend)
   VALUES ('${name}', ${price}, '${url}', 0, '${category}', '${exp_date}', ${amount}, '${description}', '${brend}');`;
   console.log(str);
        try {
            let data = await client.query(str);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async edit_product(product) {
        const { product_id, newData } = product;
        let set = ""
        for (const key in newData) {
            set += ` ${key} = '${newData[key]}',`;
        };
        set = set.slice(0, -1);
        const str = `UPDATE products SET ${set}
        WHERE product_id = ${product_id};`;
        try {
            let data = await client.query(str);
            return data;
        } catch (error) {
            return error;
        }
    }

    async delete_product(product_id) {
        const str = `DELETE FROM products WHERE product_id = ${product_id}`;
        try {
            let data = await client.query(str);
            return data
        } catch (error) {
            return error;
        }
    }

    async get_products(category) {
        let where = category ? ` WHERE category = ${category}` : '';
        const str = `SELECT * FROM products${where};`;
        try {
            let data = await client.query(str);
            return data.rows;
        } catch (error) {
            return error;
        }
    }

    async get_current_products(product_id) {
        const str = `SELECT * FROM products WHERE product_id = ${product_id}`;
        try {
            let data = await client.query(str);
            return data.rows
        } catch (error) {
            return error;
        }
    }

    async get_category(newName, id) {
        const getCat = `SELECT * FROM category`;
        const editCat = `UPDATE category SET name = '${newName}' WHERE id = ${id};`
        // console.log(newName, id);
        try {
            let data = await client.query(getCat);
            return data.rows
        } catch (error) {
            return error;
        }
    }

    async edit_category(id, newName) {
        const strDelete = `DELETE FROM category WHERE id = ${id}`;
        const strUpdate = `UPDATE category SET name = '${newName}' WHERE id = ${id};`
        const strAdd = `INSERT INTO category (name, date) VALUES ('${newName}', DEFAULT);`;
        let str = '';
        try {
            if (newName && id) {
                str = strUpdate;
            } else if (id === undefined) {
                str = strAdd;
            } else str = strDelete;
            let data = await client.query(str);
            return data;
        } catch (error) {
            return error;
        }
    }
}

module.exports = DBConntroller;


// export default = DBConntroller;

// CREATE TABLE products(
//     product_id serial PRIMARY KEY,
//     name VARCHAR (40) UNIQUE NOT NULL,
//     price INT NOT NULL,
//     url VARCHAR (200) NOT NULL,
//     rate int NOT NULL DEFAULT 5,
//     rateAmount int NOT NULL,
//     date timestamp DEFAULT CURRENT_TIMESTAMP
//     );

//------Обновление полей-----------
// UPDATE products
// SET url = 'https://www.apple.com/v/macbook-pro-14-and-16/b/images/overview/hero/hero_intro_endframe__e6khcva4hkeq_large.jpg'
// Where product_id=9;



//-----------Изменеие типа колонки-----------
// ALTER TABLE products ALTER COLUMN url TYPE VARCHAR(400) NOT NULL;



//------------Добавление новой колонки---------
// ALTER TABLE products ADD COLUMN column_name [datatype];
