import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class MyValidations {

  static matchPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const { password, password_confirm } = control.value; // Extraemos valores de ambos campos necesarios

    // comprobamos que los controles Empresa y cvv existan en el FormGroup
    // antes de ejecutar la validación.
    // if (Empresa === undefined || cvv === undefined) {
    //   throw Error(
    //     '(validarCvv): Alguno de los controles "Empresa" y/o "cvv" no se encontraron en el FormGroup aplicado.'
    //   );
    // }


    if (password == password_confirm){
      return null; // Validación correcta, devolvemos null
    }

    return { message: true }; // validación incorrecta, devolvemos un error personalizado.
  };

}
