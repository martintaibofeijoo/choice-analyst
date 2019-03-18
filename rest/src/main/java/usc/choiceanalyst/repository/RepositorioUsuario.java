package usc.choiceanalyst.repository;

import usc.choiceanalyst.model.ModeloUsuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface RepositorioUsuario extends MongoRepository<ModeloUsuario, String> {
    boolean existsByUsername(String username);
    void deleteByUsername(String username);
    Optional<ModeloUsuario> findByUsername(String username);
    List<ModeloUsuario> findAll();
    Page<ModeloUsuario> findAll(Pageable pageable);
    Page<ModeloUsuario> findAllByRolesContaining(String roles, Pageable pageable);
    ModeloUsuario save(ModeloUsuario entity);
}
