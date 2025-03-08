import React, { useCallback, useState } from "react";

import {
  ButtonAllStatuses,
  DatePickerClearable,
  MultiSelectUsage,
  SelectClearable,
} from "@react-native-blossom-ui/showcase";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Chip,
  ModalContent,
  Text,
  TextInput,
  useBlossomTheme,
  View,
} from "@react-native-blossom-ui/components";
import styles from "./UIShowcase.module.css";
import { MonthCalendar } from "@react-native-blossom-ui/dates";

const counts = Array(3).fill(Math.floor(Math.random() * 1000));

const maxWidth = "30%";
const minWidth = 330;

const chips = ["Cards", "Buttons", "Select", "Dates"];

function UIShowcase() {
  const { colors } = useBlossomTheme();

  const [selectedChip, setSelectedChip] = useState(chips[0]);

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
    <div>
      <View row>
        {chips.map((title) => (
          <Chip
            key={title}
            withCheckIcon={false}
            title={title}
            mode={selectedChip === title ? "filled" : "outlined"}
            style={{ marginHorizontal: 2 }}
            onPress={() => setSelectedChip(title)}
          />
        ))}
      </View>

      {selectedChip === chips[0] && (
        <div className={styles.container}>
          {/* GalleryView */}
          <View
            style={{
              minWidth,
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
                <View key={value} style={{ margin: 8, marginStart: 0 }}>
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
                <Text>Lorem Ipsum, a dummy text</Text>
              </View>
            </Card>
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
          <View
            style={{
              minWidth,
              margin: 16,
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
              label="Subscribe to our newsletter"
            />
            <Button
              isLoading={isSubscribing}
              title="Subscribe"
              style={{ marginVertical: 16, width: "100%" }}
              onPress={onSubscribePress}
            />
          </View>
        </div>
      )}

      {selectedChip === chips[1] && (
        <div className={styles.container}>
          {/* Buttons Modes */}

          <View style={{ margin: 16 }}>
            <Text typography="h6" style={{ marginBottom: 8 }}>
              Button Status & Modes
            </Text>
            <ButtonAllStatuses />
          </View>
        </div>
      )}

      {selectedChip === chips[2] && (
        <div className={styles.container}>
          {/* Select */}
          <View style={{ marginVertical: 16 }}>
            <Text typography="h6" style={{ marginBottom: 8 }}>
              Single Select
            </Text>
            <SelectClearable />
            <Text typography="h6" style={{ marginBottom: 8 }}>
              MultiSelect
            </Text>
            <MultiSelectUsage />
          </View>
        </div>
      )}
      {selectedChip === chips[3] && (
        <div className={styles.container}>
          {/* Select */}
          <View style={{ margin: 16 }}>
            <Text typography="h6" style={{ marginBottom: 8 }}>
              Dates
            </Text>
            <DatePickerClearable />
            <Text typography="h6" style={{ marginVertical: 8 }}>
              Calendar
            </Text>
            <MonthCalendar />
          </View>
        </div>
      )}
    </div>
  );
}

export default UIShowcase;
