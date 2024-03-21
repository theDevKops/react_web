package kr.or.iei.member.model.service;

import java.util.HashMap;
import java.util.Set;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.iei.member.model.dto.ChatMessage;

@Component
public class AllMemberChatHandler extends TextWebSocketHandler {
	//웹소켓에 접속한 회원정보를 저장하는 map
	private HashMap<WebSocketSession,String> members;
	
	public AllMemberChatHandler() {
		super();
		members = new HashMap<WebSocketSession, String>(); 
	}
		//클라이언트가 웹소켓에 접속하면 호출 되는 메소드 이다.(채팅방 접속)
		@Override
		public void afterConnectionEstablished(WebSocketSession session) throws Exception {
			System.out.println("클라이언트 접속~");
			System.out.println("session : " + session);
		}
		//클라이언트한테 데이터를 받으면 해당 데이터를 수신하는 메소드
		@Override
		protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
			System.out.println("채팅을 보낸다");
			System.out.println("session : " + session);
			System.out.println("textMessage : " + message);
			ObjectMapper om = new ObjectMapper();
			ChatMessage cm = om.readValue(message.getPayload(), ChatMessage.class);
			System.out.println(cm);
			if(cm.getType().equals("enter")) {
				//최초접속시 들어오는 type == enter -> members에 저장
				members.put(session, cm.getMemberId());
				//입장메시지 전달
				ChatMessage sendData = new ChatMessage();
				sendData.setType("enter");
				sendData.setMemberId(members.get(session));
				sendData.setMessage("");
				String sendDataStr = om.writeValueAsString(sendData);
				for(WebSocketSession ws : members.keySet()) {
					ws.sendMessage(new TextMessage(sendDataStr));
				}
				
			}else if(cm.getType().equals("chat")) {
				//채팅메시지를 보낸경우
				ChatMessage sendData = new ChatMessage();
				sendData.setType("chat");
				sendData.setMemberId(members.get(session));//메세지 보낸사람 아이디 세팅
				sendData.setMessage(cm.getMessage());
				String sendDataStr = om.writeValueAsString(sendData);//객체를 문자열로 변경
				Set<WebSocketSession> keys = members.keySet();//members map의 모든키를 set 형태로 변환
				for(WebSocketSession ws : keys) {
					ws.sendMessage(new TextMessage(sendDataStr));
				}
			}
		}
		//클라이언트가 접속을 끊으면 자동으로 호출되는 메소드(채팅방 퇴장)
		@Override
		public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
			System.out.println("클라이언트 퇴장~");
			ObjectMapper om = new ObjectMapper();
			ChatMessage sendData = new ChatMessage();
			sendData.setType("out");
			sendData.setMemberId(members.get(session));
			sendData.setMessage("");
			String sendDataStr = om.writeValueAsString(sendData);
			members.remove(session);
			for(WebSocketSession ws : members.keySet()) {
				ws.sendMessage(new TextMessage(sendDataStr));
			}
		}
}
