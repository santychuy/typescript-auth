//Cuando yo trabaje con Express
declare namespace Express {
    //Quiero expandir el objeto Request, con una nueva propiedad
    export interface Request {
        userId: string;
    }
}