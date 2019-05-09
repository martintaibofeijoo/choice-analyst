package usc.choiceanalyst.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import usc.choiceanalyst.model.ModeloExperimento;

import java.util.List;
import java.util.Optional;

public interface RepositorioExperimento extends MongoRepository<ModeloExperimento, String> {
    boolean existsByIdExperimento(String idExperimento);
    void deleteByIdExperimento(String idExperimento);
    Optional<ModeloExperimento> findByIdExperimento(String idExperimento);
    List<ModeloExperimento> findAll();
    List<ModeloExperimento> findByIdsEstablecimientosContains(String idExtablecimiento);
    List<ModeloExperimento> findByIdAdministrador(String idAdministrador);
    Page<ModeloExperimento> findAll(Pageable pageable);
    ModeloExperimento save(ModeloExperimento entity);
}
