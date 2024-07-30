package com.example.demo.exception;

// NOT USED CURRENTLY

// custom exception that extends RuntimeException - i.e. it can utilize the methods of RunTimeException
public class CustomException extends RuntimeException  {
  
  public CustomException(String message) { // can customize the message we send
    super(message); // The super(message) call in the constructor passes the error message to the RuntimeException constructor
  }
}
