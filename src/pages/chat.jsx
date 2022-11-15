import { Avatar, ChatContainer, Conversation, ConversationHeader, ConversationList, ExpansionPanel, InfoButton, MainContainer, Message, MessageGroup, MessageInput, MessageList, MessageSeparator, Sidebar, StarButton, TypingIndicator, VideoCallButton, VoiceCallButton } from "@chatscope/chat-ui-kit-react";
import Search from "antd/lib/transfer/search";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import { useState } from "react";

export default function Chat() {
    // Set initial message input value to empty string                                                                     
    const [messageInputValue, setMessageInputValue] = useState("");
    let lillyIco = "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
    return <div style={{
        height: "600px",
        position: "relative"
    }}>
        <MainContainer responsive>
            <Sidebar position="left" scrollable={false}>
                <Search placeholder="Search..." />
                <ConversationList>
                    <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you" active>
                        <Avatar src={lillyIco} name="Lilly" status="available" />
                    </Conversation>
                    <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
                        <Avatar src={lillyIco} name="Lilly" status="available" />
                    </Conversation>
                    <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
                        <Avatar src={lillyIco} name="Lilly" status="available" />
                    </Conversation>
                    <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
                        <Avatar src={lillyIco} name="Lilly" status="available" />
                    </Conversation>

                    <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
                        <Avatar src={lillyIco} name="Joe" status="dnd" />
                    </Conversation>

                    <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you" unreadCnt={3}>
                        <Avatar src={lillyIco} name="Emily" status="available" />
                    </Conversation>

                    <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you" unreadDot>
                        <Avatar src={lillyIco} name="Kai" status="unavailable" />
                    </Conversation>

                    <Conversation name="Akane" lastSenderName="Akane" info="Yes i can do it for you">
                        <Avatar src={lillyIco} name="Akane" status="eager" />
                    </Conversation>

                    <Conversation name="Eliot" lastSenderName="Eliot" info="Yes i can do it for you">
                        <Avatar src={lillyIco} name="Eliot" status="away" />
                    </Conversation>

                    <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you" active>
                        <Avatar src={lillyIco} name="Zoe" status="dnd" />
                    </Conversation>

                    <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you">
                        <Avatar src={lillyIco} name="Patrik" status="invisible" />
                    </Conversation>

                </ConversationList>
            </Sidebar>

            <ChatContainer>
                <ConversationHeader>
                    {/* <ConversationHeader.Back /> */}
                    <Avatar src={lillyIco} name="Emily" />
                    <ConversationHeader.Content userName="Emily" info="Active 10 mins ago" />
                    <ConversationHeader.Actions>
                        <StarButton title="Add to favourites" />
                        <VoiceCallButton title="Start voice call" />
                        <VideoCallButton title="Start video call" />
                        <InfoButton title="Show info" />
                    </ConversationHeader.Actions>
                </ConversationHeader>
                <MessageList typingIndicator={<TypingIndicator content="Jawad is typing" />} >{/* loading */}
                    <MessageSeparator content="Saturday, 30 November 2019" />

                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe",
                        direction: "incoming",
                        position: "single"
                    }}>
                        <Avatar src={lillyIco} name="Zoe" />
                    </Message>

                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Patrik",
                        direction: "outgoing",
                        position: "single"
                    }} avatarSpacer />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe",
                        direction: "incoming",
                        position: "first"
                    }} avatarSpacer />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe",
                        direction: "incoming",
                        position: "normal"
                    }} avatarSpacer />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe",
                        direction: "incoming",
                        position: "normal"
                    }} avatarSpacer />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe",
                        direction: "incoming",
                        position: "last"
                    }}>
                        <Avatar src={lillyIco} name="Zoe" />
                    </Message>

                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Patrik",
                        direction: "outgoing",
                        position: "first"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Patrik",
                        direction: "outgoing",
                        position: "normal"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Patrik",
                        direction: "outgoing",
                        position: "normal"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Patrik",
                        direction: "outgoing",
                        position: "last"
                    }} />

                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe",
                        direction: "incoming",
                        position: "first"
                    }} avatarSpacer />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe",
                        direction: "incoming",
                        position: "last"
                    }}>
                        <Avatar src={lillyIco} name="Zoe" />
                    </Message>
                    <Message type="image" model={{
                        direction: "incoming",
                        payload: {
                            src: lillyIco,
                            alt: "Joe avatar",
                            width: "100px"
                        }
                    }}>
                        <Avatar src={lillyIco} name="Joe" />
                    </Message>

                    <MessageGroup direction="incoming" sender="Lilly" sentTime="just now" avatarPosition="tl">
                        <Avatar src={lillyIco} name="Lilly" />
                        <Message model={{
                            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSuspendisse tempus sem quis sollicitudin cursus.\nMauris id fermentum eros, fermentum condimentum erat.\nPraesent semper malesuada tempor.\nEtiam congue neque et neque convallis, ac imperdiet nulla commodo.",
                            sentTime: "just now",
                            sender: "Lilly"
                        }} avatarPosition="cl">
                            <Avatar src={lillyIco} name="Lilly" />
                        </Message>
                        {/* <MessageSeparator content="Monday, 23 December 2019" as="h2" /> */}
                        <MessageGroup.Messages>
                            <Message model={{
                                message: "Hello my friend"
                            }} />
                            <Message model={{
                                message: "Hello my friend"
                            }} />
                            <Message model={{
                                message: "Hello my friend"
                            }} />
                            <Message model={{
                                message: "Hello my friend"
                            }} />
                        </MessageGroup.Messages>
                    </MessageGroup>

                </MessageList>
                <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val)} onSend={() => setMessageInputValue("")} />
            </ChatContainer>

            <Sidebar position="right">
                <ExpansionPanel open title="INFO">
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                </ExpansionPanel>
                <ExpansionPanel title="LOCALIZATION">
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                </ExpansionPanel>
                <ExpansionPanel title="MEDIA">
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                </ExpansionPanel>
                <ExpansionPanel title="SURVEY">
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                </ExpansionPanel>
                <ExpansionPanel title="OPTIONS">
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                </ExpansionPanel>
            </Sidebar>
        </MainContainer>
    </div>;
}