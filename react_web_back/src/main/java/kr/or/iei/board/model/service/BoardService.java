package kr.or.iei.board.model.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.board.model.dao.BoardDao;

@Service
public class BoardService {
	@Autowired
	private BoardDao boardDao;

	public Map selectBoardList(int reqPage) {
		int numPerPage = 12;		// 페이지 하나당 게시물 수
		int pageNaviSize = 5;		// 페이지 네비게이션 길이
		int totalCount = boardDao.totalCount(); // 전체 게시물 수 
		System.out.println(totalCount);
		return null;
	}
}
