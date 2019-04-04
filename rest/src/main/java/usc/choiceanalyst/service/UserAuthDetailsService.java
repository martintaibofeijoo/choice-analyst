package usc.choiceanalyst.service;

import usc.choiceanalyst.model.ModeloUsuario;
import usc.choiceanalyst.repository.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserAuthDetailsService implements UserDetailsService {
    private RepositorioUsuario db;

    @Autowired
    UserAuthDetailsService(RepositorioUsuario db){
        this.db = db;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<ModeloUsuario> user = db.findByUsername(username);

        if(user.equals(Optional.empty()))
            throw new UsernameNotFoundException(username);

        String rol = user.get().getRol();
        List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(rol);
        return new User(user.get().getUsername(), user.get().getPassword(), authorities);
    }
}
