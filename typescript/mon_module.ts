// définit et exporte la classe Utilisateur
module.exports = class Utilisateur {
    private static nextId = 0;
    private _id: number;
    private _login: string;
    private _password: string;
    private _date: Date;

    // constructeur
    constructor(login: string, password: string) {
        // l'id de l'utilisateur est le prochain id
        this._id = Utilisateur.nextId++;
        // récupération des paramètres
        this._login = login;
        this._password = password;
        // récupération de la date de création
        this._date = new Date();
    }

    // affichage sur la console
    afficher() {
        console.log('id : '+this._id+', login: '+this._login+' créé le '+this._date);
    }

    // getters et setters
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get login(): string {
        return this._login;
    }

    set login(value: string) {
        this._login = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }

    set password(value: string) {
        this._password = value;
    }

    // verification du mot de passe
    checkPassword(password: string): boolean {
        return this._password === password;
    }
}
