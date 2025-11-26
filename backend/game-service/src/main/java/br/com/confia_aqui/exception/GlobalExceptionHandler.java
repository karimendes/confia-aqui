package br.com.confia_aqui.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

        private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // Trata QuizNotFoundException
    @ExceptionHandler(QuizNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleQuizNotFoundException(
            QuizNotFoundException ex, WebRequest request) {

        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                "Quiz Not Found",
                ex.getMessage(),
                request.getDescription(false).replace("uri=", "")
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    // Trata QuestionNotFoundException
    @ExceptionHandler(QuestionNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleQuestionNotFoundException(
            QuestionNotFoundException ex, WebRequest request) {

        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                "Question Not Found",
                ex.getMessage(),
                request.getDescription(false).replace("uri=", "")
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    // Trata InvalidQuizDataException
    @ExceptionHandler(InvalidQuizDataException.class)
    public ResponseEntity<ErrorResponse> handleInvalidQuizDataException(
            InvalidQuizDataException ex, WebRequest request) {

        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Invalid Quiz Data",
                ex.getMessage(),
                request.getDescription(false).replace("uri=", "")
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // Trata InsufficientQuestionsException
    @ExceptionHandler(InsufficientQuestionsException.class)
    public ResponseEntity<ErrorResponse> handleInsufficientQuestionsException(
            InsufficientQuestionsException ex, WebRequest request) {

        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Insufficient Questions",
                ex.getMessage(),
                request.getDescription(false).replace("uri=", "")
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // Trata exceções genéricas
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(
            Exception ex, WebRequest request) {

        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
                request.getDescription(false).replace("uri=", "")
        );

        // Log do erro real (em produção, use um logger apropriado)
        logger.error("[GlobalExceptionHandler] {}: {}", ex.getClass().getName(), ex.getMessage(), ex);

        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Trata IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
            IllegalArgumentException ex, WebRequest request) {

        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                ex.getMessage(),
                request.getDescription(false).replace("uri=", "")
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

        // Trata JSON inválido (payload mal formado)
        @ExceptionHandler(org.springframework.http.converter.HttpMessageNotReadableException.class)
        public ResponseEntity<ErrorResponse> handleHttpMessageNotReadable(org.springframework.http.converter.HttpMessageNotReadableException ex, WebRequest request) {
                logger.warn("[GlobalExceptionHandler] HttpMessageNotReadableException: {}", ex.getMessage());
                ErrorResponse errorResponse = new ErrorResponse(
                                HttpStatus.BAD_REQUEST.value(),
                                "Bad Request",
                                "Payload inválido: verifique o JSON no corpo da requisição",
                                request.getDescription(false).replace("uri=", "")
                );
                return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        // Trata parâmetros de rota inválidos (ex.: /quiz/get/{16})
        @ExceptionHandler(MethodArgumentTypeMismatchException.class)
        public ResponseEntity<ErrorResponse> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex, WebRequest request) {
                logger.warn("[GlobalExceptionHandler] MethodArgumentTypeMismatchException: {}", ex.getMessage());
                ErrorResponse errorResponse = new ErrorResponse(
                                HttpStatus.BAD_REQUEST.value(),
                                "Bad Request",
                                "Parâmetro da URL inválido. Certifique-se de usar um número para IDs.",
                                request.getDescription(false).replace("uri=", "")
                );
                return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        // Trata recurso estático não encontrado — ajuda quando uma requisição é tratada como recurso e não como controller
        @ExceptionHandler(NoResourceFoundException.class)
        public ResponseEntity<ErrorResponse> handleNoResourceFound(NoResourceFoundException ex, WebRequest request) {
                logger.warn("[GlobalExceptionHandler] NoResourceFoundException: {}", ex.getMessage());
                ErrorResponse errorResponse = new ErrorResponse(
                                HttpStatus.NOT_FOUND.value(),
                                "Not Found",
                                "Recurso não encontrado (verifique o caminho e método HTTP).",
                                request.getDescription(false).replace("uri=", "")
                );
                return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
}

