import { Box, Fab, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useState } from 'react';
import { Member } from './types';
import { useMembers } from './hooks/useMembers';
import { useTags } from './hooks/useTags';
import { MemberList } from './components/MemberList/MemberList';
import { MemberDetail } from './components/MemberDetail/MemberDetail';
import { MemberForm } from './components/MemberForm/MemberForm';
import { TagManagement } from './components/TagManagement/TagManagement';

const AppContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(3),
}));

const FabContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  '& > button': {
    boxShadow: theme.shadows[3],
  },
}));

function App() {
  const {
    members,
    selectedMember,
    setSelectedMember,
    addMember,
    updateMember,
    deleteMember,
    reorderMembers,
  } = useMembers();

  const {
    tags,
    addTag,
    updateTag,
    deleteTag,
  } = useTags();

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTagManagementOpen, setIsTagManagementOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | undefined>(undefined);

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member);
    setIsDetailOpen(true);
  };

  const handleAddClick = () => {
    setEditingMember(undefined);
    setIsFormOpen(true);
  };

  const handleEditClick = () => {
    if (selectedMember) {
      setEditingMember(selectedMember);
      setIsFormOpen(true);
      setIsDetailOpen(false);
    }
  };

  const handleFormSubmit = (formData: Omit<Member, 'id' | 'isEditable' | 'createdAt'>) => {
    if (editingMember) {
      updateMember(editingMember.id, formData);
    } else {
      addMember(formData);
    }
    setIsFormOpen(false);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingMember(undefined);
  };

  const handleDetailClose = () => {
    setIsDetailOpen(false);
    setSelectedMember(null);
  };

  return (
    <AppContainer>
      <MemberList
        members={members}
        onMemberClick={handleMemberClick}
        onReorder={reorderMembers}
      />

      <MemberDetail
        member={selectedMember}
        open={isDetailOpen}
        onClose={handleDetailClose}
        onEdit={handleEditClick}
        onDelete={deleteMember}
      />

      <MemberForm
        open={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        member={editingMember}
        availableTags={tags}
      />

      <TagManagement
        open={isTagManagementOpen}
        onClose={() => setIsTagManagementOpen(false)}
        tags={tags}
        onAddTag={addTag}
        onUpdateTag={updateTag}
        onDeleteTag={deleteTag}
      />

      <FabContainer>
        <Fab
          color="secondary"
          aria-label="タグ管理"
          onClick={() => setIsTagManagementOpen(true)}
          size="medium"
        >
          <LocalOfferIcon />
        </Fab>
        <Fab
          color="primary"
          aria-label="メンバー追加"
          onClick={handleAddClick}
          size="large"
        >
          <AddIcon />
        </Fab>
      </FabContainer>
    </AppContainer>
  );
}

export default App;
