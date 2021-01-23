import { ChevronRightIcon, DeleteIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  HStack,
  Stack,
  VStack,
  List,
  ListItem,
} from "@chakra-ui/react";
import { FunctionComponent, useMemo, useRef, useState } from "react";
import { useAppStateContext } from "../../contexts/AppStateContext";
import { createFreshAppState, downloadAppState } from "../../lib/AppState";
import { groupAsessmentResults } from "../../lib/Assessment";
import { NavLink } from "../NavLink/NavLink";
import { PageTitle } from "../PageTitle/PageTitle";
import { SectionTitle } from "../SectionTitle/SectionTitle";

export const DashboardHome: FunctionComponent = () => {
  const [appState, setAppState] = useAppStateContext();
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const cancelDeleteAlertRef = useRef();
  const groupedAssessmentResults = useMemo(
    () => groupAsessmentResults(appState.assessmentResults),
    [appState.assessmentResults]
  );
  return (
    <VStack alignItems="stretch">
      <PageTitle>Learner Dashboard</PageTitle>
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={cancelDeleteAlertRef}
        onClose={() => setIsDeleteAlertOpen(true)}
      >
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Permanently delete all data
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete all data? Data will be permanently
            lost.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Stack direction="row" spacing={4}>
              <Button
                ref={cancelDeleteAlertRef}
                onClick={() => setIsDeleteAlertOpen(false)}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  setAppState(() => createFreshAppState());
                  setIsDeleteAlertOpen(false);
                }}
              >
                Delete
              </Button>
            </Stack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <HStack spacing={4} justifyContent="flex-end">
        <Button
          colorScheme="red"
          rightIcon={<DeleteIcon />}
          onClick={() => setIsDeleteAlertOpen(true)}
        >
          Delete all data
        </Button>
        <Button
          rightIcon={<DownloadIcon />}
          onClick={() => downloadAppState(appState)}
        >
          Export all data
        </Button>
      </HStack>
      <VStack alignItems="stretch">
        <SectionTitle>Learner profiles</SectionTitle>
        <List pl="1em">
          {Object.entries(groupedAssessmentResults).map(
            ([learnerId, assessmentResults]) => (
              <ListItem key={learnerId}>
                <NavLink href={`/dashboard/learner/${learnerId}`}>
                  {learnerId} ({assessmentResults.length})
                  <ChevronRightIcon ml="0.5em" />
                </NavLink>
              </ListItem>
            )
          )}
        </List>
      </VStack>
    </VStack>
  );
};
