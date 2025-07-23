sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
  ], function (Controller, MessageToast, JSONModel) {
    "use strict";
  
    return Controller.extend("roomatepro.roommatepro.controller.sign_in", {
      onInit: function () {
        this.initializeValidationModel();
      },
  
      initializeValidationModel: function () {
        var oFormModel = new JSONModel({
          login: {
            email: "",
            emailError: false,
            emailErrorText: "",
            password: "",
            passwordError: false,
            passwordErrorText: ""
          }
        });
        this.getView().setModel(oFormModel, "loginModel");
      },
      onEmailInputLiveChange: function (oEvent) {
        var sValue = oEvent.getParameter("value");
        var oFormModel = this.getView().getModel("loginModel");
        var oData = oFormModel.getData().login;
        oData.email = sValue;
        oData.emailError = false;
        oData.emailErrorText = "";
        oFormModel.refresh(true); // Refresh the model to update the view
      },
      onPasswordInputLiveChange: function (oEvent) {    
        var sValue = oEvent.getParameter("value");
        var oFormModel = this.getView().getModel("loginModel");
        var oData = oFormModel.getData().login;
        oData.password = sValue;
        oData.passwordError = false;
        oData.passwordErrorText = "";
        oFormModel.refresh(true); // Refresh the model to update the view
      },
      onLogin: function () {
        var oFormModel = this.getView().getModel("loginModel");
        var oData = oFormModel.getData().login;
        var isValid = true;
  
        if (!oData.email) {
          oData.emailError = true;
          oData.emailErrorText = "Email is required.";
          isValid = false;
        } else if (!this.isValidEmail(oData.email)) {
          oData.emailError = true;
          oData.emailErrorText = "Invalid email format.";
          isValid = false;
        }
  
       
        if (!oData.password) {
          oData.passwordError = true;
          oData.passwordErrorText = "Password is required.";
          isValid = false;
        } else if (oData.password.length < 6) {
          oData.passwordError = true;
          oData.passwordErrorText = "Password must be at least 6 characters.";
          isValid = false;
        }
  
        oFormModel.refresh(true); 
  
        if (isValid) {
          this.getView().setBusy(true);
        //  this.byId("email").setBusy(true);
          setTimeout(() => {
            MessageToast.show("Login Successful!");
           // this.byId("email").setBusy(false);
           this.getView().setBusy(false);
  
          
            this.getOwnerComponent().getRouter().navTo("dashboard");
          }, 2000);
        } else {
          MessageToast.show("Please fix the errors.");
        }
      }, 
      onAfterRendering: function () {
        google.accounts.id.initialize({
          client_id: "566750718139-6e15e8b5cs31548pthijoaninuo9vtpu.apps.googleusercontent.com", 
            callback: this.onGoogleSignIn.bind(this)
        });
    
        const container = this.byId("googleSignInContainer").getDomRef();
        if (container) {
            google.accounts.id.renderButton(container, {
                theme: "outline",
                size: "large"
            });
        }
    },
    
    onGoogleSignIn: async function (response) {
      
      const token = response.credential;
      // const oView = this.getView();
      // const oModel = oView.getModel("loginModel");
  
      // const oPassword = oModel.getProperty("/login/password");
  
      try {
        debugger
        this.getView().setBusy(true);
          const result = await fetch("http://localhost:8080/api/auth/google", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ 
                token: token})
          });
  
          if (result.ok) {
            const data = await result.json(); 
              sap.m.MessageToast.show("Login successful!");
              var oFormModel = this.getView().getModel("loginModel");
                 var oData = oFormModel.getData();
                    if (data.email) {
                      this.getView().setBusy(true);
                      this.getOwnerComponent().getRouter().navTo("dashboard");
                    }
  
                  //  oData.login.email = data.email;
                  //  oData.login.password = data.password;
                  // oData.login.name = data.name;
                  oFormModel.refresh(true);
              console.log("Server response:", data);
          } else {
              sap.m.MessageToast.show("Login failed.");
              console.error("Server responded with status:", result.status);
          }
      } catch (error) {
          console.error("Error during Google Sign-In:", error);
          sap.m.MessageToast.show("An error occurred.");
      }
  },
  
    
    decodeJwt: function (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    },
     
  
      onForgotPassword: function () {
        
        
      },
  
      onSignUp: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("signup");
      },
  
      isValidEmail: function (sEmail) {
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(sEmail);
      }
    });
  });
  