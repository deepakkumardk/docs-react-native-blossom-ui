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
import styles from "./UIShowcase.module.css";

const counts = Array(3).fill(Math.floor(Math.random() * 1000));

const maxWidth = "30%";
const minWidth = 330;

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
  }, [email]);

  return (
    <div
      style={{
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <div
        style={{
          margin: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Text
          typography="h4"
          status="primary"
          style={{ alignSelf: "center", textAlign: "center" }}
        >
          Largest React-Native UI Component Library in the Open-Source Community
        </Text>
      </div>

      <div className={styles.container}>
        {/* GalleryView */}
        <View
          style={{
            minWidth,
            margin: 16,
            alignItems: "center",
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
                  size={100}
                  url={"https://picsum.photos/200/300?random=" + index}
                />
                <Text typography="b1">{value}</Text>
                <Text>{counts[index]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Card */}
        <View style={{ margin: 16, alignItems: "center" }}>
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
              <Text>Lorem Ipsum, a dummy text</Text>
            </View>
          </Card>
        </View>

        {/* Select */}
        <View style={{ margin: 16, alignItems: "center" }}>
          <Text typography="h6" style={{ marginBottom: 8 }}>
            Select
          </Text>
          <SelectUsage />
          <MultiSelectUsage />
        </View>

        {/* Modal Content */}
        <View style={{ margin: 16, alignItems: "center" }}>
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
        <View
          style={{
            minWidth,
            margin: 16,
            alignItems: "center",
          }}
        >
          <Text typography="h5">Subscribe Us</Text>
          <TextInput
            label="Email"
            placeholder="abc@gmail.com"
            value={email}
            onChangeText={setEmail}
            containerStyle={{ marginVertical: 8 }}
            error={isError ? "Please enter a valid email" : ""}
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
            style={{ marginVertical: 16, alignSelf: "center" }}
            onPress={onSubscribePress}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text typography="h6" style={{ marginBottom: 8 }}>
            Button Status & Modes
          </Text>
          <ButtonAllStatuses />
        </View>
      </div>
    </div>
  );
}

export default UIShowcase;
