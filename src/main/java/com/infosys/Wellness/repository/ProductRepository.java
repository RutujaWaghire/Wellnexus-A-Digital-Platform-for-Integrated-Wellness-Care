package com.infosys.Wellness.repository;

import com.infosys.Wellness.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
