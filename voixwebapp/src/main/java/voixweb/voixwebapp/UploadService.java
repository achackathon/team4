package voixweb.voixwebapp;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ibm.watson.developer_cloud.speech_to_text.v1.RecognizeOptions;
import com.ibm.watson.developer_cloud.speech_to_text.v1.SpeechToText;
import com.ibm.watson.developer_cloud.speech_to_text.v1.model.SpeechResults;

@RestController
public class UploadService implements IUploadService {

	private static final String CONTENT_TYPE = "audio/wav";
	private static final String PORTUGUESE_MODE = "pt-BR_BroadbandModel";
	private static final String ENGLISH_MODE = "en-US_BroadbandModel";

	public enum Lingua{
		ingles,
		portugues
	}

	@RequestMapping("/upload")
	public void traduzAudio(HttpServletRequest request, HttpServletResponse response)
		        throws ServletException, IOException {		
		
		byte[] fileBytes = (request.getParameter("attachment")).getBytes();

		SpeechToText service = new SpeechToText();
		service.setUsernameAndPassword("2c47d6f1-1a9d-42f7-89e4-0cd18a3a548e", "dQ5L2stBjXPK");
		
		/** @description  Converte array de byte[] para File.  */
		String filePath = "/home/fcangussu/Downloads/Voz00101.wav";
		Files.write(new File(filePath).toPath(), fileBytes);
		File audio = new File(filePath);
		
		RecognizeOptions rec = new RecognizeOptions();
		rec.model(PORTUGUESE_MODE);
		rec.contentType(CONTENT_TYPE);
		rec.inactivityTimeout(30);
		rec.wordConfidence(Boolean.TRUE);

		SpeechResults transcript = service.recognize(audio , rec);
		response.getOutputStream().print(transcript.toString());				
	}
	


	//public String traduzAudio(@RequestParam(value="file") FileInputStream stream,
//	@RequestParam(value="lingua") Lingua linguaInput) {
	
	public static void main(String[] args) {

		SpeechToText service = new SpeechToText();
		service.setUsernameAndPassword("2c47d6f1-1a9d-42f7-89e4-0cd18a3a548e", "dQ5L2stBjXPK");
		File audio = new File("/home/fcangussu/Downloads/Voz001.wav");
		
		RecognizeOptions rec = new RecognizeOptions();
		rec.model(PORTUGUESE_MODE);
		rec.contentType(CONTENT_TYPE);
		rec.inactivityTimeout(30);
		rec.wordConfidence(Boolean.TRUE);

		SpeechResults transcript = service.recognize(audio , rec);

		System.out.println(transcript);
				
	}

}