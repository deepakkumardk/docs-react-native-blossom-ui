import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native";

import {
  ButtonAllStatuses,
  MultiSelectUsage,
  SelectUsage,
} from "@react-native-blossom-ui/showcase";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  ModalContent,
  Text,
  TextInput,
  useBlossomTheme,
  View,
} from "@react-native-blossom-ui/components";

const counts = Array(3).fill(Math.floor(Math.random() * 1000));

const maxWidth = "30%";
const minWidth = 400;

function UIShowcase() {
  const { colors } = useBlossomTheme();
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);

  const onSubscribePress = useCallback(() => {
    if (!email) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
    }, 1500);
  }, []);

  return (
    <ScrollView horizontal>
      <View
        row
        style={{
          alignSelf: "baseline",
          marginHorizontal: 20,
        }}
      >
        {/* GalleryView */}
        <View
          style={{
            minWidth,
            maxWidth,
            margin: 16,
          }}
        >
          <View
            row
            style={{
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Text typography="h6">Albums</Text>
            <Button mode="plain" status="info">
              See All
            </Button>
          </View>
          <View row>
            {["Holiday", "Family", "Favorite"].map((value, index) => (
              <View style={{ margin: 8, marginStart: 0 }}>
                <Avatar
                  mode="round"
                  size={120}
                  url={"https://picsum.photos/200/300?random=" + index}
                />
                <Text typography="b1">{value}</Text>
                <Text>{counts[index]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Card */}
        <View style={{ margin: 16 }}>
          <Text typography="h6" style={{ marginBottom: 8 }}>
            Card
          </Text>
          <Card row style={{ minWidth, maxWidth }}>
            <Avatar
              mode="round"
              url="https://picsum.photos/200/300?random=1"
              style={{ margin: 8 }}
            />

            <View style={{ marginVertical: 6 }}>
              <Text typography="s1">Amazing Title</Text>
              <Text style={{ color: colors.text300 }}>Subtitle</Text>
              <Text>Lorem Ipsum is simply dummy text</Text>
            </View>
          </Card>
        </View>

        {/* Select */}
        <View style={{ margin: 16 }}>
          <Text typography="h6" style={{ marginBottom: 8 }}>
            Select
          </Text>
          <SelectUsage />
          <MultiSelectUsage />
        </View>

        {/* Modal Content */}
        <View style={{ margin: 16 }}>
          <Text typography="h6" style={{ marginBottom: 8 }}>
            Modal Content
          </Text>
          <Card style={{ minWidth, maxWidth, padding: 8 }}>
            <ModalContent
              title="Hello world"
              description="Lorem ipsum"
              actionButtons={[
                {
                  title: "Cancel",
                },
                {
                  title: "Done",
                },
              ]}
            />
          </Card>
        </View>

        {/* Subscribe Form */}
        <View style={{ minWidth, maxWidth, margin: 16 }}>
          <Text typography="h5">Subscribe Us</Text>
          <TextInput
            label="Email"
            placeholder="abc@gmail.com"
            value={email}
            onChangeText={setEmail}
            containerStyle={{ marginVertical: 8 }}
            error={isError ? "Please enter your email" : ""}
          />
          <Checkbox
            status="primary"
            size="small"
            position="left"
            // adjacent
            label="Subscribe to our newsletter"
          />
          <Button
            isLoading={isSubscribing}
            title="Subscribe"
            style={{ width: "100%", marginVertical: 16 }}
            onPress={onSubscribePress}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text typography="h6" style={{ marginBottom: 8 }}>
            Button Status & Modes
          </Text>
          <ButtonAllStatuses />
        </View>
      </View>
    </ScrollView>
  );
}

export default UIShowcase;
