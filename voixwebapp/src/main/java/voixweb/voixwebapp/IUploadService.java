package voixweb.voixwebapp;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface IUploadService {

	public void traduzAudio(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException;

}