package usc.choiceanalyst.config;
import org.springframework.http.HttpHeaders;

public interface AuthConstants {
    String TOKEN_PREFIX = "Bearer";
    String TOKEN_SECRET = "mtfqZG0rJkxuL1AsOjtbQjBDLDV1K25nTXd0cCNZYU9jWn00UWY2U1VqJ35RNHp7MmBdOkxmtf";
    Long TOKEN_DURATION = 3600000L;
    String AUTH_HEADER  = HttpHeaders.AUTHORIZATION;
    String ROLES_CLAIM  = "Roles";
}
