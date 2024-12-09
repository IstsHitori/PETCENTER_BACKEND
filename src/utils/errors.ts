export enum CATEGORY_ERRORS {
    CATEGORY_EXIST = "Esta categoria ya existe",
    CATEGORY_DOESNT_EXIST = "Esta categoria no existe",
    NAME_EMPTY = "El nombre de la categoria no puede estar vacío",
    DESCRIPTION_EMPTY = "La descripción de la categoria no puede estar vacío",
    ID_NOT_VALID= "ID de categoria no valido"
}

export enum PRODUCT_ERRORS {
    CATEGORY_EMPTY = "La categoría no puede estar vacía",
    NAME_EMPTY = "El nombre del producto no puede estar vacío",
    BRAND_EMPTY = "La marca del producto no puede estar vacío",
    PRICE_EMPTY = "El precio del producto no puede estar vacío",
    QUANTITY_EMPTY = "La cantidad del producto no puede estar vacío",
    WITGHT_EMPTY = "El peso del producto no puede estar vacío",
    CATEGORY_ID_NOT_VALID= "ID de categoria no valido",
    PRODUCT_ID_NOT_VALID= "ID del producto no valido",
    PRICE_ARE_NOT_NUMBER= "El precio debe ser numérico",
    QUANTITY_ARE_NOT_NUMBER= "La cantidad debe ser numérico",
    PRODUCT_DOESNT_EXIST = "Este producto no existe",
    PRODUCT_EXIST = "Ya existe un producto con este nombre",

}

export enum PATIENT_ERRORS{
    PATIENT_DOES_NOT_EXIST = "Este paciente no existe",
    ID_PATIENT_NOT_VALID = "ID de paciente no valido"
}
export enum SERVICE_ERRORS{
    NAME_EMPTY = "El nombre del servicio no puede estar vacio",
    PRICE_EMPTY = "El precio del servicio no puede estar vacio",
    PRICE_NUMERIC = "El precio del servicio debe ser numérico",
    ID_NOT_VALID = "ID de servicio no valido",
    PATIENT_NOT_TO_VACCINATE = "Paciente no permitido para vacunarse.",
    STATE_EMPTY = "El estado no puede estar vacío.",
    SERVICE_NOT_FOUND = "El servicio no se encontro.",
    
}
export enum ORDER_ERRORS{
    ITEM_EMPTY = "Error, no hay ningún item seleccionado para vender",
    CUSTOMER_EMPTY = "Error, no hay datos del cliente ",
    TOTAL_AMOUNT_EMPTY = "Error, se debe calcular el valor total a pagar ",
    METHOD_EMPTY = "Error, se debe agregar el metodo de pago",
}