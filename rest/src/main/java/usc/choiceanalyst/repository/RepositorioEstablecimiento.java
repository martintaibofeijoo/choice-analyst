package usc.choiceanalyst.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import usc.choiceanalyst.model.ModeloEstablecimiento;

import java.util.List;
import java.util.Optional;

public interface RepositorioEstablecimiento extends MongoRepository<ModeloEstablecimiento, String> {
    boolean existsByIdEstablecimiento(String idEstablecimiento);
    void deleteByIdEstablecimiento(String idEstablecimiento);
    Optional<ModeloEstablecimiento> findByIdEstablecimiento(String idEstablecimiento);
    List<ModeloEstablecimiento> findAll();
    Page<ModeloEstablecimiento> findAll(Pageable pageable);
    ModeloEstablecimiento save(ModeloEstablecimiento entity);
}
