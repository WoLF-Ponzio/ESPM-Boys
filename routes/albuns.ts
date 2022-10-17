import app = require("teem");

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

class AlbunsRoute {
	public async index(req: app.Request, res: app.Response) {
		res.render("albuns/index");
	}

	@app.route.methodName("capivaras-mutantes")
	public async capivaras(req: app.Request, res: app.Response) {
		res.render("albuns/capivaras");
	}

	@app.route.methodName("reis-sem-coroa")
	public async reis(req: app.Request, res: app.Response) {
		res.render("albuns/reis");
	}
}

export = AlbunsRoute;
