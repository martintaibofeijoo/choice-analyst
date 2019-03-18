package usc.choiceanalyst.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import usc.choiceanalyst.config.AuthConstants;
import usc.choiceanalyst.model.auth.Credentials;
import usc.choiceanalyst.service.UserAuthDetailsService;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.TextCodec;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager manager;
    private UserAuthDetailsService users;

    public AuthenticationFilter(UserAuthDetailsService users, AuthenticationManager manager){
        this.manager = manager;
        this.users = users;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            Credentials credentials = new ObjectMapper().readValue(request.getInputStream(), Credentials.class);

            return manager.authenticate(new UsernamePasswordAuthenticationToken(credentials.getUsername(), credentials.getPassword(), Collections.emptyList()));
        }catch (IOException ex){
            throw new RuntimeException(ex);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        Long now = System.currentTimeMillis();

        String authorities = authResult.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));

        JwtBuilder tokenBuilder = Jwts.builder()
                .setSubject(((User)(authResult.getPrincipal())).getUsername())
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + AuthConstants.TOKEN_DURATION))
                .claim(AuthConstants.ROLES_CLAIM, authorities)
                .signWith(SignatureAlgorithm.HS512, TextCodec.BASE64.decode(AuthConstants.TOKEN_SECRET));
                //.compressWith(CompressionCodecs.DEFLATE);

        response.addHeader(AuthConstants.AUTH_HEADER, String.format("%s %s", AuthConstants.TOKEN_PREFIX, tokenBuilder.compact()));
    }

}
