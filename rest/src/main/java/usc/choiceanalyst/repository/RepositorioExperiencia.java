package usc.choiceanalyst.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import usc.choiceanalyst.model.ModeloExperiencia;

import java.util.List;
import java.util.Optional;

public interface RepositorioExperiencia extends MongoRepository<ModeloExperiencia, String> {
    boolean existsByIdCliente(String idCliente);
    void deleteByIdCliente(String idCliente);
    Optional<ModeloExperiencia> findByIdCliente(String username);
    List<ModeloExperiencia> findAll();
    Page<ModeloExperiencia> findAll(Pageable pageable);
    ModeloExperiencia save(ModeloExperiencia entity);
}
