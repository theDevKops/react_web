package kr.or.iei.board.model.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardDao {

	int totalCount();

}
