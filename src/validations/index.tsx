import * as Yup from "yup";


   // Validation scheme Login  for the input field type ------------------------------
   export const schemaLogin = Yup.object().shape({
    email: Yup.string().email("Email invalit ").required("Email is required"),
    password: Yup.string().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        "Password must contain at least one uppercase, one lowercase letter, one number, one special character, and be between 8 to 20 characters long"
      ).required("Password is required")
  });
  //==========================================



// -----> Worker add <----------------------------------------
export const validationSchemaWorkerAdd = Yup.object().shape({
    age: Yup.string().required("Age is required"),
    phone_number: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    first_name: Yup.string().required("First Name is required"),
    gender: Yup.string().required("Gender is required"),
    last_name: Yup.string().required("Last Name is required"),
    password: Yup.string().required("Password is required")
  });



// ------> Worker edit <---------------------------------------------
export const validationSchemaWorkerEdit = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    first_name: Yup.string().required("First Name is required"),
    gender: Yup.string().required("Gender is required"),
    last_name: Yup.string().required("Last Name is required"),
    password: Yup.string().required("Password is required"),
    phone_number: Yup.string().min(19, "Phone invalit ").required("Phone is required"),
    age: Yup.number().required("Age is required"),
    id: Yup.string().required("ID is required"),
  });

  const validSizes = ['M', 'CM', 'D', 'C', 'XC', 'L', 'XL', 'X', 'V', 'I'];

//   Validate product add  <------------------------------------------------
export const validationSchemaProductAdd = Yup.object().shape({
    age_max: Yup.number().required("Max Age is required").positive("Age must be a positive number"),
    age_min: Yup.number().required("Min Age is required").positive("Age must be a positive number"),
    category_id: Yup.string().required("Category ID is required"),
    color: Yup.string()
        .required("Color is required")
        .test('is-valid-colors', "Each color must be at least 3 characters long", function(value) {
            if (!value) return false;
            const colors = value.split(/\s+/).map(c => c.trim());
            return colors.every(color => color.length >= 4);
        }),
    cost: Yup.number().required("Cost is required").positive("Cost must be a positive number"),
    count: Yup.number().required("Count is required").positive("Count must be a positive number"),
    discount: Yup.number().required("Discount is required").positive("Discount must be a positive number"),
    for_gender: Yup.string().required("For Gender is required"),
    made_in: Yup.string().required("Made In is required"),
    product_name: Yup.string().required("Product Name is required"),
    size: Yup.string()
        .required("Size is required")
        .test('is-valid-sizes', "Size must be one or more of the following: M, CM, D, C, XC, L, XL, X, V, I", function(value) {
            if (!value) return false;
            const sizes = value.split(/\s+/).map(s => s.trim());
            return sizes.every(size => validSizes.includes(size));
        }),
    description: Yup.string().required("Description is required"),
    
  });