package kr.or.iei.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class LoginInterceptor implements HandlerInterceptor {
	@Autowired
	private JwtUtil jwtutil;
	
	//컨트롤러로 가기 전에 토큰에서 아이디를 추출해서 컨트롤러에서 사용할 수 있도록 등록
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		//로그인을 성공한 이후에 요청이 들어오면 header에서 인증토큰을꺼냄
		String auth = request.getHeader(HttpHeaders.AUTHORIZATION);
		System.out.println("헤더에서 꺼낸 정보 :" + auth);//Bearer 토큰값
		//1. 인증토큰이 없거난 또는 잘못된값을 보낸 경우
		if(auth == null || auth.indexOf("null") != -1 || !auth.startsWith("bearer ")) {
			System.out.println("인증이 없거나, 잘못된경우");
			return false;//인증이 없거나 잘못된 경우이므로 이후 컨트롤러 실행X
		}
		//인증코드 값은 형식에 맞는상태
		//2. 인증시간이 만료되었는지 체크
		String token = auth.split(" ")[1];//토큰값만 분리해서 가져옴
		if(jwtutil.isExpired(token)) {
			System.out.println("인증시간이 만료된 경우");
			return false;
		}
		
		//1,2, 과정통과 -> 인증정보 정상이고, 만료되기 전 상태 => 정상요청
		//-> 이후 컨트롤러에서 로그인한 회원 아이디를 사용할 수 있또록 아이디를 추출해서 등록
		String memberId = jwtutil.getMemberId(token);
		request.setAttribute("memberId", memberId);
		return true;
	}
	
}
