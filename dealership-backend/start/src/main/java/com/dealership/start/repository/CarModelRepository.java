package com.dealership.start.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dealership.start.model.CarModel;

@Repository
public interface CarModelRepository extends JpaRepository<CarModel, Long>{

    @Query("SELECT c FROM CarModel c " +
    "WHERE (:model IS NULL OR LOWER(c.model) = LOWER(:model)) " +
    "AND (:make IS NULL OR LOWER(c.make) = LOWER(:make)) " +
    "AND (:carCondition IS NULL OR LOWER(c.carCondition) = LOWER(:carCondition)) " +
    "AND (:price IS NULL OR c.price <= :price) " +
    "AND (:year IS NULL OR c.year = :year)")
    List<CarModel> findByFilters(
        @Param("model") String model, 
        @Param("make") String make, 
        @Param("carCondition") String carCondition, 
        @Param("year") Integer year, 
        @Param("price") Float price);
}
