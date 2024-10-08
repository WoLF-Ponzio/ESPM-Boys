﻿import app = require("teem");

//**********************************************************************************
// Se por acaso ocorrer algum problema de conexão, autenticação com o MySQL,
// por favor, execute este código abaixo no MySQL e tente novamente!
//
// ALTER USER 'USUÁRIO'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SENHA';
//
// * Assumindo que o usuário seja root e a senha root, o comando ficaria assim:
//
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
//
//**********************************************************************************

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		res.render("index/index");
	}

	public async shows(req: app.Request, res: app.Response) {
		let shows: any[];
		let dateDataBase:any[];
		let  mesData = [];
		let showsPassados: any[];
		let dateDataBasePassados:any[];
		let  mesDataPassados = [];
		
		await app.sql.connect(async (sql) => {

			shows = await sql.query("SELECT idshow, nome, date_format(data, '%d/%m/%Y %H:%i') data, link, endereco FROM evento where data >= sysdate() ORDER BY data DESC");
			dateDataBase = await sql.query("SELECT idshow, nome,date_format(data, '%d') as dia, date_format(data, '%m') as mes, date_format(data, '%d/%m/%Y %H:%i') data, link, endereco FROM evento where data >= sysdate() ORDER BY data DESC");
			for(let i=0; i < dateDataBase.length; i++){
				
				
				let dataLocal = new Date(dateDataBase[i].mes);
				let month = dataLocal.toLocaleString('default', {month:'short'});
				mesData[i] =  month;

				showsPassados = await sql.query("SELECT idshow, nome, date_format(data, '%d/%m/%Y %H:%i') data, link, endereco FROM evento where data < sysdate() ORDER BY data DESC");
				dateDataBasePassados = await sql.query("SELECT idshow, nome,date_format(data, '%d') as dia, date_format(data, '%m') as mes, date_format(data, '%d/%m/%Y %H:%i') data, link, endereco FROM evento where data < sysdate() ORDER BY data DESC");
				for(let i=0; i < dateDataBasePassados.length; i++){
					let dataLocal = new Date(dateDataBasePassados[i].mes);
					let month = dataLocal.toLocaleString('default', {month:'short'});
					mesDataPassados[i] =  month;
				} 
					
		} 
		});

		const opcoes = {
			shows: shows,
			dateDataBase : dateDataBase,
			mesData : mesData,
			showsPassados: showsPassados,
			dateDataBasePassados : dateDataBasePassados,
			mesDataPassados : mesDataPassados,
		};

		res.render("index/shows", opcoes);
	}

	public async sobre(req: app.Request, res: app.Response) {
		res.render("index/sobre");
	}

	public async cadastro(req: app.Request, res: app.Response) {
		res.render("index/cadastro");
	}

	@app.http.post()
	public async criarEvento(req: app.Request, res: app.Response) {
		// Os dados enviados via POST ficam dentro de req.body
		let evento = req.body;

		// É sempre muito importante validar os dados do lado do servidor,
		// mesmo que eles tenham sido validados do lado do cliente!!!
		if (!evento) {
			res.status(400);
			res.json("Dados inválidos");
			return;
		}

		if (!evento.nome) {
			res.status(400);
			res.json("Nome inválido");
			return;
		}

		if (!evento.data) {
			res.status(400);
			res.json("Data inválida");
			return;
		}

		if (!evento.link) {
			res.status(400);
			res.json("Link inválido");
			return;
		}

		if (!evento.endereco) {
			res.status(400);
			res.json("Endereço inválido");
			return;
		}

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			// As interrogações serão substituídas pelos valores passados ao final, na ordem passada.
			await sql.query("INSERT INTO evento (nome, data, link, endereco) VALUES (?, ?, ?, ?)", [evento.nome, evento.data, evento.link, evento.endereco]);

		});

		res.json(true);
	}
}

export = IndexRoute;
