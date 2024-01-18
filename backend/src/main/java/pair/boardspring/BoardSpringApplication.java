package pair.boardspring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import pair.boardspring.security.userdetails.CustomUserDetails;

@SpringBootApplication
public class BoardSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(BoardSpringApplication.class, args);

		System.out.println("CustomUserDetails" + CustomUserDetails.class.getClassLoader());
		System.out.println("SecurityUser" + org.springframework.security.core.userdetails.User.class.getClassLoader());
	}

}
